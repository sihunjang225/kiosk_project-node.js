import express from "express";
import OrderItemController from "../controllers/order_item.controllers";

const router = express.Router();

// 상품 발주 API
router.post("/orderItems", OrderItemController.addOrderItem);

// 발주 상태 수정 API
router.patch("/orderItems/:id/state", OrderItemController.updateOrderItemState);

export default router;
