import Item from "../db/models/items.js";

class ItemRepository {
  static async addItem(name, price, type) {
    try {
      const newItem = await Item.create({
        name,
        price,
        type,
        amount: 0, // item의 기본 수량(amount)는 0으로 고정
      });
      return newItem;
    } catch (err) {
      throw err;
    }
  }

  static async getItems(type = null) {
    try {
      let items;
      if (type) {
        items = await Item.findAll({ where: { type } });
      } else {
        items = await Item.findAll();
      }
      return items;
    } catch (err) {
      throw err;
    }
  }

  static async deleteItem(id) {
    try {
      const item = await Item.findByPk(id);
      if (!item) {
        throw new Error("상품을 찾을 수 없습니다.");
      }

      if (item.amount > 0) {
        throw new Error("현재 수량이 남아있습니다. 삭제하시겠습니까?");
      }

      await item.destroy();
      return true;
    } catch (err) {
      throw err;
    }
  }

  static async updateItem(id, name, price) {
    try {
      const item = await Item.findByPk(id);
      if (!item) {
        throw new Error("상품을 찾을 수 없습니다.");
      }

      if (name) {
        item.name = name;
      }

      if (price !== undefined && price >= 0) {
        item.price = price;
      } else {
        throw new Error("알맞은 가격을 입력해주세요.");
      }

      await item.save();
      return item;
    } catch (err) {
      throw err;
    }
  }
}

export default ItemRepository;
