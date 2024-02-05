import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
<<<<<<< HEAD
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"
        },
    },
    {
        timestamps: true
=======
        cartId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Cart"
        },
    },
    {
        timestamps:true
>>>>>>> faf2d82838410a67f02f690efe3fc742ba629dd6
    }
)

const shippingInfoSchema = new mongoose.Schema(
    {
<<<<<<< HEAD
        name: {
            type: String,
            required: true
        },
        Address: {
            type: String,
            required: true
=======
        name:{
            type: String,
            required:true
        },
        Address:{
            type: String,
            required:true
>>>>>>> faf2d82838410a67f02f690efe3fc742ba629dd6
        }
    }
)
const paymentSchema = new mongoose.Schema(
    {
<<<<<<< HEAD
        cardNumber: {
            type: Number,
            required: true
        },
        expiryDate: {
            type: Date,
            required: true
        },
        CVV: {
            type: String,
            required: true
=======
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
>>>>>>> faf2d82838410a67f02f690efe3fc742ba629dd6
        },
    }
)

const orderInfoSchema = new mongoose.Schema({
    order: [orderSchema],
    shippingInfo: [shippingInfoSchema],
    payment: [paymentSchema]
})
<<<<<<< HEAD
const Order = mongoose.model('Order', orderInfoSchema)
=======
const Order = mongoose.model('Order' , orderInfoSchema)
>>>>>>> faf2d82838410a67f02f690efe3fc742ba629dd6
export default Order