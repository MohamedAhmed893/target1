import express from "express";
import auth from "../middleware/auth.js";
import order from "../controllers/Order.js";

const router = new express.Router();

router.post("/order", auth, order.createOrder);
export default router;
