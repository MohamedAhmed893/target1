import express from "express";
import { addproduct, deleteProduct, getAllProduct, getSpacificProduct, updateProduct } from "../../controllers/product.js";
import auth from "../../middleware/auth.js";
import { uploadMixOfFile } from "../../middleware/uploadFile.js";

const productRouter = express.Router();
let arreyOfFields=[{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }]
productRouter.post("/", uploadMixOfFile(arreyOfFields,'product'),addproduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getSpacificProduct);
productRouter.put("/:id",uploadMixOfFile(arreyOfFields,'product'), updateProduct);
productRouter.get("/:id", deleteProduct);

export default productRouter;
