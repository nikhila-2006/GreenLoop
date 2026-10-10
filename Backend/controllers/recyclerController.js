const Recycler = require("../models/recycler");
module.exports.allRecyclers=async (req, res) => {
    try {
        const {pickupAddress}=req.query
        console.log(pickupAddress);
        const parts = pickupAddress.split(/[,\s]+/).map(part => part.trim()).filter(part => part.length >= 3);;
        const recyclers = await Recycler.find({
            $or: parts.flatMap(part => [{
                    servicesAreas: {
                        $regex: part,
                        $options: "i"
                    }
                },{
            address: {
                $regex: part,
                $options: "i"
            }
        }])}).select("-password");
        res.status(200).json({
            success: true,
            recyclers,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch recyclers",
        });
    }
}