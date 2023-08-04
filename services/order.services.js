import { sequelize } from "../db/sequelize";
import OrderCustomerRepository from "../repositories/";
import OrderItemCustomerRepository from "../repositories/order_item.repository";

class OrderService {
  static async createOrder(orderData) {
    const totalPrice = await OrderController.calculateTotalPrice(orderData);
    const orderId = await OrderCustomerRepository.createOrder(
      orderData,
      totalPrice
    );
    await OrderItemCustomerRepository.createItemOrderCustomers(
      orderId,
      orderData.items
    );
    return { order_id: orderId, total_price: totalPrice };
  }

  static async updateOrderState(orderId, state) {
    if (state === true) {
      throw new Error("완료된 주문은 취소할 수 없습니다.");
    }

    return sequelize.transaction(async (t) => {
      await OrderCustomerRepository.updateOrderState(orderId, state, t);
      await OrderItemCustomerRepository.updateItemAmountOnCancel(orderId, t);
    });
  }
}

export default OrderService;
