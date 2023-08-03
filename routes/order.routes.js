import express from "express";
import OrderController from "../controllers/order.controller";

const router = express.Router();

// 상품 주문 API
router.post("/createOrder", OrderController.createOrder);

export default router;
