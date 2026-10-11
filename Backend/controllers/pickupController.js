const mongoose = require("mongoose");
const Pickup = require("../models/pickup");
const Waste = require("../models/waste");
const Recycler = require("../models/recycler");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../config/s3");

module.exports.createPickup = async (req, res) => {
    try {
        const { wasteId, recyclerId, customerName, phone, address, scheduledAt, imageUrl} = req.body;
        if ( !wasteId || !recyclerId || !customerName?.trim() || !phone?.trim() || !address?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required pickup details.",
            });
        }
        if (!mongoose.isValidObjectId(wasteId) || !mongoose.isValidObjectId(recyclerId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid waste or recycler ID.",
            });
        }
        const waste = await Waste.findById(wasteId);
        if (!waste) {
            return res.status(404).json({
                success: false,
                message: "Waste record not found.",
            });
        }
        // Verify the selected recycler exists
        const recycler = await Recycler.findById(recyclerId);
        if (!recycler) {
            return res.status(404).json({
                success: false,
                message: "Recycler not found.",
            });
        }
        // Create pickup request
        const pickup = await Pickup.create({
            waste: waste._id,
            recycler: recycler._id,
            customerName: customerName.trim(),
            phone: phone.trim(),
            address: address.trim(),
            scheduledAt: scheduledAt || null,
            status: "Pending",
            imageUrl: imageUrl,
        });
        return res.status(201).json({
            success: true,
            message: "Pickup request created successfully!",
            pickup,
        });
    } catch (error) {
        console.error("Create pickup error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create pickup request.",
        });
    }
};

module.exports.getRecyclerPickups = async (req, res) => {
    try {
        const recyclerId = req.user.id;
        const pickups = await Pickup.find({ recycler:recyclerId }).populate("waste").populate("recycler").sort({ createdAt: -1 });
        const pickupsWithImages = await Promise.all(pickups.map(async (pickup) => {
                const pickupData = pickup.toObject();
                const filename = pickupData.waste?.image?.filename;
                if (filename) {
                    pickupData.imageUrl = await getSignedUrl(
                        s3,
                        new GetObjectCommand({
                            Bucket: process.env.S3_BUCKET_NAME,
                            Key: filename,
                        }),
                        { expiresIn: 3600 }
                    );
                }
                return pickupData;
            })
        );
        return res.status(200).json({
            success: true,
            count: pickupsWithImages.length,
            pickups:pickupsWithImages,
        });
    } catch (error) {
        console.error("Error fetching recycler pickups:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch pickups",
        });
    }
}
module.exports.acceptPickup = async (req, res) => {
    try {
        const { pickupId } = req.params;
         console.log(pickupId);
        const recyclerId = req.user.id;
        const pickup = await Pickup.findOne({ _id: pickupId, recycler: recyclerId,});
        if (!pickup) {
            return res.status(404).json({
                message: "Pickup not found.",
            });
        }
        if (pickup.status !== "Pending") {
            return res.status(400).json({
                message: "This pickup is no longer pending.",
            });
        }
        pickup.status = "Accepted";
        pickup.scheduledAt = new Date();
        await pickup.save();
        return res.status(200).json({
            success: true,
            message: "Pickup accepted successfully.",
            pickup,
        });
    } catch (error) {
        console.error("Accept pickup error:", error);

        return res.status(500).json({
            message: "Failed to accept pickup.",
        });
    }
};