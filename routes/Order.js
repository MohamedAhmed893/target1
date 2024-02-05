import express from "express";

import order from "../controllers/Order.js";
const router = new express.Router();

router.post("/order", order.createOrder);
export default router;
