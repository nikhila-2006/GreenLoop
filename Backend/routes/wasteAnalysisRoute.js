const express = require("express");
const router = express.Router();
const {analyzeWasteImage} = require("../controllers/wasteAnalysisController");

router.post("/api/waste-analysis/analyze", analyzeWasteImage);

module.exports = router;