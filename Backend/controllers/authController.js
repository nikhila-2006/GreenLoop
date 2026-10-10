const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Recycler = require("../models/recycler");
const getModel = (role) => {
    return role === "recycler" ? Recycler : User;
};
const emailExists = async (email) => {
    const user = await User.exists({ email });
    const recycler = await Recycler.exists({ email });
    return Boolean(user || recycler);
};
module.exports.register = async (req, res) => {
    try {
        const { name, email, password, phone,address } = req.body;
        const role = req.authRole;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, password and address are required",
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters",
            });
        }
        const normalizedEmail = email.trim().toLowerCase();
        if (await emailExists(normalizedEmail)) {
            return res.status(409).json({
                message: "An account with this email already exists",
            });
        }
        const Model = getModel(role);
        const userData = {
            name: name.trim(),
            email: normalizedEmail,
            password: await bcrypt.hash(password, 12),
            phone,address:address.trim()};
        if (role === "recycler") {
            const { businessName, address, serviceAreas } = req.body;
            if (!businessName?.trim()) {
                return res.status(400).json({
                    message: "Business name is required",
                });
            }
            userData.businessName = businessName.trim();
            userData.address = address;
            userData.serviceAreas = serviceAreas || [];
        }
        const account = await Model.create(userData);
        return res.status(201).json({
            message: "Registration successful",
            account: {
                id: account._id,
                name: account.name,
                email: account.email,
                role,
            },});
    } catch (error) {
        console.error("Registration error:", error);
        if (error.code === 11000) {
            return res.status(409).json({
                message: "An account with this email already exists",
            });       
        }
        return res.status(500).json({
            message: "Registration failed",
        });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const role = req.authRole;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        const Model = getModel(role);
        const account = await Model.findOne({
            email: email.trim().toLowerCase(),
        }).select("+password");
        if (!account) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const passwordMatches = await bcrypt.compare( password, account.password);
        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const token = jwt.sign({
            id: account._id.toString(),
            role,},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN || "1d", });
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: account._id,
                name: account.name,
                email: account.email,
                role,
            },
        });
    }catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({
            message: "Login failed",
    });}
};

