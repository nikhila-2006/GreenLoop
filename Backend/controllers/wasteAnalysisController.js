const { GoogleGenAI } = require("@google/genai");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");
const path = require("path");
const mongoose = require("mongoose");
const Waste = require("../models/Waste");
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));
    async function generateWithRetry(request, maxRetries = 2) {
    for (let attempt = 0; ; attempt++) {
        try {
            return await request();
        } catch (error) {
            const status = error.status ?? error.statusCode;
            if (![429, 500, 503, 504].includes(status) ||attempt >= maxRetries ) {
                throw error;
            }
            await sleep(1000 * 2 ** attempt);
        }
    }
}
const analyzeWasteImage = async (req, res) => {
    try {
        const { wasteId } = req.body;
        if (!mongoose.isValidObjectId(wasteId)) {
            return res.status(400).json({
                success: false,
                message: "A valid waste record ID is required",
            });
        }
        const waste = await Waste.findById(wasteId);
        if (!waste) {
            return res.status(404).json({
                success: false,
                message: "Waste record not found",
            });
        }
        // Use the filename stored in MongoDB, not a client-provided path.     
        const filename = waste.image?.filename;
        if( !filename ||  path.basename(filename) !== filename || !/\.(jpg|jpeg|png|webp)$/i.test(filename) ) {
            return res.status(400).json({
                success: false,
                message: "Waste record has an invalid image key",
            });
        }
        // Retrieve the image from the private S3 bucket.
        const s3Response = await s3.send(
            new GetObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: filename,
            }));
        const imageBuffer = Buffer.from(
            await s3Response.Body.transformToByteArray()
        );
        if (imageBuffer.length > 10 * 1024 * 1024) {
            return res.status(413).json({
                success: false,
                message: "Image must be 10 MB or smaller",
            });
        }
        const extension = path.extname(filename).toLowerCase();
        const mimeType = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".webp": "image/webp",
        }[extension];
        const result = await generateWithRetry(() =>
            ai.models.generateContent({model: "gemini-3.8-flash", contents: [
                    {role: "user",
                        parts: [ {
                        text: `You are a waste identification and recycling assistant for GreenLoop.
                            Analyze the provided image and return ONLY a valid JSON object.
                            Do not include Markdown, code fences, explanations, or text outside the JSON.
                            Use exactly this JSON structure: {
                                    "item": "string",
                                    "category": "string",
                                    "material": "string",
                                    "weight": null,
                                    "estimatedValue": null,
                                    "recyclable": null
                                }
                            Instructions:
                            1. item:
                            - Identify the primary visible waste item as specifically as the image allows.
                            - Examples: keyboard, plastic bottle, cardboard box, glass jar, newspaper.
                            - If the item cannot be identified confidently, use "Unknown".
                            2. category:
                            - Choose EXACTLY ONE of these category names:
                                "Paper", "Plastic", "Metal", "Glass",
                                "E-waste", "Organic Waste", "Other".
                            - Return the category exactly as written above.
                            - Paper: paper products, newspapers, books, and cardboard.
                            - Plastic: plastic bottles, containers, packaging, and other plastic items.
                            - Metal: metal cans, scrap metal, and primarily metallic objects
                                that are not electronic waste.
                            - Glass: glass bottles, jars, and other primarily glass items.
                            - E-waste: electronic devices, computer peripherals,
                                electrical equipment, circuit boards, and electronic components.
                            - Organic Waste: food scraps, leaves, and other biodegradable
                                organic waste.
                            - Other: items that do not reasonably fit any category above
                                or cannot be classified confidently.
                            - For mixed-material objects, classify according to the item's
                                primary function and waste type. Electronic devices belong to E-waste
                                even when they contain plastic or metal.
                            3. material:
                            - Identify visible or reasonably inferable materials.
                            - Examples: plastic, metal, glass, paper, cardboard,
                                or plastic and metal.
                            - Do not claim an exact composition that cannot be established visually.
                            - Use "Unknown" when the material cannot be identified confidently.
                            4. weight:
                            - Always return null.
                            - Do not estimate physical weight from the image.
                            - The user will provide the actual weight separately.
                            5. estimatedValue:
                            - Always return null.
                            - Do not calculate or invent a market price.
                            - GreenLoop calculates the estimated value using the user-provided
                                weight and its configured recycling rate.
                            6. recyclable:
                            - Return true if the item is generally recyclable through
                                an appropriate recycling process.
                            - Return false if it is generally non-recyclable.
                            - Return null if this cannot be determined confidently.
                            - Consider that actual recyclability depends on material,
                                condition, and local recycling facilities.
                            7. Accuracy:
                            - Analyze only the visible evidence.
                            - Do not invent details or claim certainty when the image is unclear.
                            - Do not infer hazardous composition from appearance alone.
                            - If the image does not clearly show waste, use "Unknown" for item,
                                "Other" for category, "Unknown" for material, and null for recyclable.
                            Ensure the output is valid JSON and all six fields are present.`.trim(),},
            {inlineData: {
                mimeType,
                data: imageBuffer.toString("base64"),},
        }, ], }, ],}));
        const cleanedText = result.text.replace(/```json\s*/i, "").replace(/```/g, "").trim();
        const analysis = JSON.parse(cleanedText);
        // Validate model output before saving.
        if (
        typeof analysis.item !== "string" ||
        typeof analysis.category !== "string" ||
        typeof analysis.material !== "string" ||
        !(
            analysis.recyclable === null ||
            typeof analysis.recyclable === "boolean"
        )
        ) {
        return res.status(502).json({
            success: false,
            message: "AI returned invalid waste analysis fields",
        });
        }
        // Save analysis into the existing Waste document.
        const wasteRates = require("../config/wasteRates");
        const category = analysis.category;
        const weight = Number(req.body.weight);
        if (!Number.isFinite(weight) || weight <= 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid waste weight greater than zero."
            });}
        const ratePerKg = wasteRates[category];
        if (ratePerKg === undefined) {
            return res.status(400).json({
                success: false,
                message: "Invalid waste category."
            });}
        const estimatedValue = Number((weight * ratePerKg).toFixed(2));
        waste.item = analysis.item;
        waste.category = analysis.category;
        waste.material = analysis.material;
        waste.weight = weight;
        waste.estimatedValue =estimatedValue;
        waste.recyclable = analysis.recyclable;
        await waste.save();
        return res.status(200).json({
            success: true,
            message: "Waste image analyzed successfully",
            waste,
        });
    } catch (error) {
        console.error("Waste image analysis failed:", error);
        const status = error.status ?? error.statusCode;
        if (error.status === 429) {
            return res.status(429).json({
                success: false,
                code: "AI_QUOTA_EXCEEDED",
                message:
                    "Our AI analysis limit has been reached. Please try again later."
            });}
        if ([429, 500, 503, 504].includes(status)) {
            return res.status(503).json({
                success: false,
                message:
                "AI analysis is temporarily unavailable. Please try again later.",
            });}
        if (error instanceof SyntaxError) {
            return res.status(502).json({
                success: false,
                message: "We couldn't analyze this image right now. Please try again.",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to analyze waste image",
        });
    }
};

module.exports = { analyzeWasteImage };