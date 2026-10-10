const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
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
    address: {
        type: String,
        trim: true,
    },
},{ timestamps: true })
module.exports=mongoose.models.User || mongoose.model("User",userSchema)