import slugify from "slugify"
import { productModel } from "../Models/productModel.js"
import { AppError } from "../utils/AppError.js"
import { catchAsyncError } from "../middleware/catchAsyncError.js"


const addproduct= catchAsyncError(async (req,res,next)=>{
    // req.body.user=req.user._id
    req.body.slug =slugify(req.body.title)
    // req.body.imgCover=req.files.imageCover[0].filename
    // req.body.imgs=req.files.images.map(ele=>ele.filename)
    const product =new productModel(req.body)
    await product.save()
    res.json({message:"success",product})
})

const getAllProduct =catchAsyncError(async (req,res,next)=>{
let products =await productModel.find({})
res.json({message:"success",products})
   
})

const getSpacificProduct =catchAsyncError(async (req,res,next)=>{
    const {id} =req.params
    const product =await productModel.findById(id)
    !product && next(new AppError("Product Not Found",403))
    product && res.json({message:"success",product})
})
const deleteProduct =catchAsyncError(async (req,res,next)=>{
    const {id} =req.params
    const product =await productModel.findByIdAndDelete(id)
    !product && next(new AppError("Product Not Found",403))
    product && res.json({message:"success",product})
})
const updateProduct =catchAsyncError(async (req,res,next)=>{
    const {id} =req.params
  if(req.body.title) req.body.slug =slugify(req.body.title)
    const product =await productModel.findByIdAndUpdate(id,req.body)
    !product && next(new AppError("Product Not Found",403))
    product && res.json({message:"success",product})
})

export {
    addproduct ,
    getAllProduct ,
    getSpacificProduct ,
    updateProduct ,
    deleteProduct
}