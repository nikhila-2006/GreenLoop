const express = require("express");
const router = express.Router();
const pickupController = require("../controllers/pickupController");

const  authMiddleware = require("../middleware/authMiddleware");

router.post("/pickups", authMiddleware, pickupController.createPickup);
router.get("/pickups", authMiddleware, pickupController.getRecyclerPickups);
router.patch( "/:pickupId/accept", authMiddleware, pickupController.acceptPickup);
module.exports = router;
