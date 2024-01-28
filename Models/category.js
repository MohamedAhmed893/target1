import mongoose from "mongoose";

const categorySchema =mongoose.Schema({
    name:{
        type:String ,
        minlength:[3,"the name to Short"] ,
        required:true ,
        unique:[true ,"the name should be unique"],
        trim:true
    } ,
    slug:{
        type:String ,
        lowercase:true ,
        required:true
    } ,
    user:{
        type:mongoose.Types.ObjectId ,
        ref:'user' ,
    } ,
    img:{
        type:String 
    }
})

export const categoryModel =mongoose.model('category',categorySchema)