import express from "express";
import ItemController from "../controllers/item.controllers";

const router = express.Router();
// 상품 추가 API
router.post("/items", ItemController.addItem);

// 상품 조회 API
router.get("/items", ItemController.getItems);

// 상품 삭제 API
router.delete("/items/:id", ItemController.deleteItem);

// 상품 수정 API
router.patch("/items/:id", ItemController.updateItem);

export default router;
