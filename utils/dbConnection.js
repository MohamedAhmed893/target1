import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect("mongodb+srv://target:target123@cluster0.xnavg3n.mongodb.net/target12").then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log("error in connect");
    })
}