const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const wasteRouter=require("./routes/wasteRoutes")
const authRouter=require("./routes/authRoutes");
const wasteAnalysisRoutes = require("./routes/wasteAnalysisRoute");
const recyclerRoutes=require("./routes/recyclersRoutes")
app.use(cors());
app.use(express.json());

app.use("/",authRouter);
app.use("/",wasteRouter);
app.use("/", wasteAnalysisRoutes);
app.use("/", recyclerRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "GreenLoop backend is running",
    });
});
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
startServer();
