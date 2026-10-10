// Import Express
const express = require("express");
// Import the Express Router object
const router=express.Router();
// Import auth-middleware
// Require authController
const authController=require('../controllers/authController');
const authMiddleware =require('../middleware/authMiddleware');
const setRole = (role) => (req, res, next) => {
    req.authRole = role;
    next();
};
// User authentication
router.post("/user/register", setRole("user"), authController.register);
router.post("/user/login", setRole("user"), authController.login);
// Recycler authentication
router.post("/recycler/register", setRole("recycler"), authController.register);
router.post("/recycler/login", setRole("recycler"), authController.login);

router.get("/me", authMiddleware, authController.getCurrUser);
module.exports= router;