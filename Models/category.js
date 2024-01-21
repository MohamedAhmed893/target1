import mongoose from "mongoose";

const categorySchema =mongoose.Schema({
    name:String ,
    slug:String ,
    image:String ,
})

export const categoryModel =mongoose.model('category',categorySchema)