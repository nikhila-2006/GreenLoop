const mongoose = require("mongoose");
const pickupSchema = new mongoose.Schema({
    waste: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Waste",
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    recycler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recycler",
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [
            "Pending",
            "Accepted",
            "Picked Up",
            "Cancelled",
        ],
        default: "Pending",
    },
    scheduledAt: {
        type: Date,
        default: null,
    },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Pickup", pickupSchema);
