const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { randomUUID } = require("crypto");
const path = require("path");
const s3 = require("../config/s3");
const Waste = require("../models/Waste");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
module.exports.analyzeWaste = async (req, res) => {
    let imageKey;
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a waste image",
            });
        }
        const extension = path.extname(req.file.originalname).toLowerCase();
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
        if (!allowedExtensions.includes(extension)) {
            return res.status(400).json({
                success: false,
                message: "Only JPEG, PNG, and WebP images are allowed",
            });
        }
        // Generate a unique S3 object key.
        imageKey = `${randomUUID()}${extension}`;
        // Upload the image to S3.
        await s3.send(
            new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: imageKey,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            })
        );
        // Create the waste record after the upload succeeds.
        const waste = new Waste({
            image: {
                filename: imageKey,
                url: "",
            },
            category: "Unclassified",
            item: "Pending analysis",
            material: "Unknown",
            weight: null,
            estimatedValue: null,
            recyclable: null,
        });
        await waste.save();
        const imageUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: waste.image.filename,
            }),
            { expiresIn: 3600 });
        return res.status(201).json({
            success: true,
            message: "Image uploaded to S3 successfully",
            waste:{
                ...waste.toObject(),
                image: {...waste.image.toObject(),url: imageUrl, },
        }});
    } catch (error) {
        console.error("Waste upload failed:", error);
        // Avoid leaving an orphaned S3 object if MongoDB save fails.
        if (imageKey) {
            try {
                await s3.send(
                    new DeleteObjectCommand({
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: imageKey,
                    })
                );
            } catch (cleanupError) {
                console.error("S3 cleanup failed:", cleanupError);
            }
        }
        return res.status(500).json({
            success: false,
            message: "Failed to upload waste image",
        });
    }
};
