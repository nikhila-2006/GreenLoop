// Import Express
const express = require("express");
// Import the Express Router object
const router=express.Router();
const upload = require("../middleware/upload");
const wasteController=require("../controllers/wasteController")

router.post("/api/waste/analyze",upload.single("image"),wasteController.analyzeWaste);

module.exports=router