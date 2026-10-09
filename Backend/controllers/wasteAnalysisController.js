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
        const result = await generateWithRetry(() => ai.models.generateContent({
            // Verify this model is available to your API key.
            model: "gemini-3.8-flash",
            contents: [ { role: "user",
                parts: [ {
                    text: `Analyze this waste image and return ONLY valid JSON.
                        Use exactly these fields:
                        {
                        "item": "string",
                        "category": "string",
                        "material": "string",
                        "weight": null,
                        "estimatedValue": null,
                        "recyclable": null
                        }
                        Instructions:
                        - item: identify the visible waste item.
                        - category: likely waste category.
                        - material: likely material composition.
                        - weight: estimated weight in kilograms, or null
                        if it cannot be estimated reliably from the image.
                        - estimatedValue: estimated monetary value in INR, or null
                        if it cannot be estimated reliably.
                        - recyclable: true, false, or null if uncertain.
                        - Never invent precise weight or market value from an image.
                        - Do not infer hazardous composition from appearance alone.
                        - Treat all estimates as uncertain when appropriate.`.trim(), },
                {
                    inlineData: {
                    mimeType,
                    data: imageBuffer.toString("base64"),
                    },
                },
                ],
            },
            ],
        })
        );
        const cleanedText = result.text.replace(/```json\s*/i, "").replace(/```/g, "").trim();
        const analysis = JSON.parse(cleanedText);
        // Validate model output before saving.
        if (
        typeof analysis.item !== "string" ||
        typeof analysis.category !== "string" ||
        typeof analysis.material !== "string" ||
        !(
            analysis.weight === null ||
            (typeof analysis.weight === "number" &&
            Number.isFinite(analysis.weight) &&
            analysis.weight >= 0)
        ) ||
        !(
            analysis.estimatedValue === null ||
            (typeof analysis.estimatedValue === "number" &&
            Number.isFinite(analysis.estimatedValue) &&
            analysis.estimatedValue >= 0)
        ) ||
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
        waste.item = analysis.item;
        waste.category = analysis.category;
        waste.material = analysis.material;
        waste.weight = analysis.weight;
        waste.estimatedValue = analysis.estimatedValue;
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
        if ([429, 500, 503, 504].includes(status)) {
        return res.status(503).json({
            success: false,
            message:
            "AI analysis is temporarily unavailable. Please try again later.",
        });}
        if (error instanceof SyntaxError) {
            return res.status(502).json({
                success: false,
                message: "AI returned an invalid JSON response",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to analyze waste image",
        });
    }
};

module.exports = { analyzeWasteImage };