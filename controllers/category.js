import slugify from "slugify"
import { catchAsyncError } from "../middleware/catchAsyncError.js"
import { AppError } from "../utils/AppError.js"
import { categoryModel } from "../Models/category.js"



const addcategory= catchAsyncError(async (req,res,next)=>{
    // req.body.user=req.user._id
    req.body.slug =slugify(req.body.name)
    const category =new categoryModel(req.body)
    await category.save()
    res.json({message:"success",category})
})

const getAllcategory =catchAsyncError(async (req,res,next)=>{
let categorys =await categoryModel.find({})
res.json({message:"success",categorys})
   
})

const getSpacificcategory =catchAsyncError(async (req,res,next)=>{
    const {id} =req.params
    const category =await categoryModel.findById(id)
    !category && next(new AppError("category Not Found",403))
    category && res.json({message:"success",category})
})
const deletecategory =catchAsyncError(async (req,res,next)=>{
    const {id} =req.params
    const category =await categoryModel.findByIdAndDelete(id)
    !category && next(new AppError("category Not Found",403))
    category && res.json({message:"success",category})
})
const updatecategory =catchAsyncError(async (req,res,next)=>{
    const {id} =req.params
  if(req.body.name) req.body.slug =slugify(req.body.name)
    const category =await categoryModel.findByIdAndUpdate(id,req.body)
    !category && next(new AppError("category Not Found",403))
    category && res.json({message:"success",category})
})

export {
    addcategory ,
    getAllcategory ,
    getSpacificcategory ,
    updatecategory ,
    deletecategory
}