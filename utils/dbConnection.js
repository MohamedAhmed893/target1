import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect("mongodb+srv://nora:nora@cluster0.ptpifd2.mongodb.net/blogs?retryWrites=true&w=majority").then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log("error in connect");
    })
}