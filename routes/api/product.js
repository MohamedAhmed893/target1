import express from "express";
import { addproduct, deleteProduct, getAllProduct, getSpacificProduct, updateProduct } from "../../controllers/product.js";
import auth from "../../middleware/auth.js";
import { uploadMixOfFile } from "../../middleware/uploadFile.js";

const productRouter = express.Router();
let arreyOfFields = [{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }]
productRouter.post("/", auth, uploadMixOfFile(arreyOfFields, 'product'), addproduct);
productRouter.get("/", auth, getAllProduct);
productRouter.get("/:id", auth, getSpacificProduct);
productRouter.put("/:id", auth, uploadMixOfFile(arreyOfFields, 'product'), updateProduct);
productRouter.delete("/:id", auth, deleteProduct);

export default productRouter;
