import OrderItemRepository from "../repositories/order_item.repository";

class OrderItemService {
  static async addOrderItem(itemId) {
    try {
      const orderItem = await OrderItemRepository.addOrderItem(itemId);
      return orderItem;
    } catch (err) {
      throw err;
    }
  }

  static async updateOrderItemState(id, state) {
    try {
      const updatedOrderItem = await OrderItemRepository.updateOrderItemState(
        id,
        state
      );
      return updatedOrderItem;
    } catch (err) {
      throw err;
    }
  }
}

export default OrderItemService;
