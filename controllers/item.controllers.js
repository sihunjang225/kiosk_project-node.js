import ItemService from "../services/item.services";

class ItemController {
  static async addItem(req, res) {
    try {
      const { name, price, type } = req.body;

      // 이름, 가격이 없을 경우 에러 처리
      if (!name || !price) {
        return res
          .status(400)
          .json({ error: `${name ? "가격" : "이름"}을 입력해주세요.` });
      }

      // 알맞은 타입이 아닐 경우 에러 처리
      if (!["coffee", "juice", "food"].includes(type)) {
        return res.status(400).json({ error: "알맞은 타입을 지정해주세요." });
      }

      // item의 기본 수량(amount)는 0으로 고정 (상품 발주시 amount 증가)
      const newItem = await ItemService.addItem(name, price, type);
      res.json({ message: "상품이 추가되었습니다.", item: newItem });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getItems(req, res) {
    try {
      const { type } = req.query;
      const items = await ItemService.getItems(type);
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteItem(req, res) {
    try {
      const id = req.params.id;
      const isDeleted = await ItemService.deleteItem(id);
      if (isDeleted) {
        res.json({ message: "상품이 삭제되었습니다." });
      } else {
        res.json({ message: "상품 삭제에 실패하였습니다." });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async updateItem(req, res) {
    try {
      const id = req.params.id;
      const { name, price } = req.body;
      const updatedItem = await ItemService.updateItem(id, name, price);
      if (updatedItem) {
        res.json({ message: "상품이 수정되었습니다.", item: updatedItem });
      } else {
        res.json({ message: "상품 수정에 실패하였습니다." });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default ItemController;
