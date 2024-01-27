import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        cartId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Cart"
        },
    },
    {
        timestamps:true
    }
)

const shippingInfoSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:true
        },
        Address:{
            type: String,
            required:true
        }
    }
)
const paymentSchema = new mongoose.Schema(
    {
        cardNumber:{
            type: Number,
            required:true
        },
        expiryDate:{
            type: Date,
            required:true
        },
        CVV:{
            type: String,
            required:true
        },
    }
)

const orderInfoSchema = new mongoose.Schema({
    order: [orderSchema],
    shippingInfo: [shippingInfoSchema],
    payment: [paymentSchema]
})
const Order = mongoose.model('Order' , orderInfoSchema)
export default Order