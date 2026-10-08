const Waste = require("../models/waste");

module.exports.analyzeWaste=async(req,res)=>{
    
    try{
        console.log("FILE:", req.file.filename);
        const waste=new Waste({
            image:{
                filename:req.file ? req.file.filename : "",
                url:req.file ? `/uploads/${req.file.filename}` :""
            },
            category:"E-waste",
            item:"Keyboard",
            material:"Plastic+Metal",
            weight:1,
            estimatedValue:100,
            recyclable:true
        })
        res.status(201).json({
            message:"Waste analyzed successfully",
            waste
        })
    }catch(err){
        res.status(500).json({
            message:"Failed to analyze waste",
            error:err.message
        })
    }
}