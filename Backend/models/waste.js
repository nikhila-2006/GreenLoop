const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const wasteSchema=new Schema({
    image:{
        filename: {
            type: String,
            default:""
        },
        url:{
            type:String,
            default:""
        }
    },
    category:{
        type:String,
    },
    item:{
        type:String
    },
    material:{
        type:String
    },
    weight:{
        type:Number
    },
    estimatedValue:{
        type:Number
    },
    recyclable:{
        type:Boolean
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Waste",wasteSchema)