import express from "express";
import { addcategory } from "../../controllers/category.js";

const categoryRouter =express.Router()
categoryRouter.post('/',addcategory)


export default categoryRouter