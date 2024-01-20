import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            required:true,
            min:[1,'Quanity can not be less than 1.'],
        },
        price:{
            type:Number,
            required:true,
        },
        total:{
            type:Number,
            required:true
        }
        
    },
    {
        timestamps:true
    }
)

const cartSchema = new mongoose.Schema(
    {
        items:[itemSchema],
        subTotal:{
            type:Number,
            default:0
        }
    },
    {
        timestamps:true
    }
)

module.exports= mongoose.model('cart' , cartSchema)