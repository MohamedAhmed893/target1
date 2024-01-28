import express from "express";
import { addcategory, deletecategory, getAllcategory, getSpacificcategory, updatecategory } from "../../controllers/category.js";
import { uploadFile } from "../../middleware/uploadFile.js";

const categoryRouter =express.Router()
categoryRouter.post("/",uploadFile('image','category'),addcategory);
categoryRouter.get("/", getAllcategory);
categoryRouter.get("/:id", getSpacificcategory);
categoryRouter.put("/:id",uploadFile('image','category'), updatecategory);
categoryRouter.get("/:id", deletecategory);

export default categoryRouter