import express from "express";
import { addcategory, deletecategory, getAllcategory, getSpacificcategory, updatecategory } from "../../controllers/category.js";
import { uploadFile } from "../../middleware/uploadFile.js";
import auth from "../../middleware/auth.js"
const categoryRouter = express.Router()
categoryRouter.post("/", auth, uploadFile('image', 'category'), addcategory);
categoryRouter.get("/", auth, getAllcategory);
categoryRouter.get("/:id", auth, getSpacificcategory);
categoryRouter.put("/:id", auth, uploadFile('image', 'category'), updatecategory);
categoryRouter.delete("/:id", auth, deletecategory);

export default categoryRouter