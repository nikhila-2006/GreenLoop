const express = require("express");
const router = express.Router();
const Recycler = require("../models/recycler");
const authMiddleware=require("../middleware/authMiddleware")
const recyclerController=require("../controllers/recyclerController")

router.get("/recyclers",authMiddleware,recyclerController.allRecyclers);

module.exports=router;