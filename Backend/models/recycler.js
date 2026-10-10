const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const recyclerSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        minlength:8,
        select:false,
        required:true
    },
    phone: {
        type: String,
        trim: true,
    },
    businessName: {
        type: String,
        trim: true,
        required:true
    },
    address: {
        type: String,
        trim: true,
    },
    servicesAreas:[{
        type:String,
        trim:true
    }],
},{ timestamps: true })

module.exports=mongoose.models.Recycler || mongoose.model("Recycler",recyclerSchema)