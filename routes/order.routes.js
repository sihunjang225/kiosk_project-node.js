import express from "express";
import OrderController from "../controllers/order.controller";

const router = express.Router();

// 상품 주문 API
router.post("/orders", OrderController.createOrder);

// 상품 수정 API
router.patch("/orders/:orderId", OrderController.updateOrder);

export default router;
