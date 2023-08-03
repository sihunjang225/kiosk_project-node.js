import express from "express";
import OptionController from "../controllers";

const router = express.Router();

const optionController = new OptionController();

//옵션 추가 API
router.post("/type/:typeId", optionController.create);

//옵션 수정 API
router.patch("/option/:id", optionController.update);

//옵션 삭제 API
router.delete("/option/:id", optionController.delete);

export default router;
