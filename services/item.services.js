import ItemRepository from "../repositories/items.repository";

class ItemService {
  static async addItem(name, price, type) {
    try {
      const newItem = await ItemRepository.addItem(name, price, type);
      return newItem;
    } catch (err) {
      throw err;
    }
  }

  static async getItems(type = null) {
    try {
      const items = await ItemRepository.getItems(type);
      return items;
    } catch (err) {
      throw err;
    }
  }

  static async deleteItem(id) {
    try {
      const isDeleted = await ItemRepository.deleteItem(id);
      return isDeleted;
    } catch (err) {
      throw err;
    }
  }

  static async updateItem(id, name, price) {
    try {
      const updatedItem = await ItemRepository.updateItem(id, name, price);
      return updatedItem;
    } catch (err) {
      throw err;
    }
  }
}

export default ItemService;
