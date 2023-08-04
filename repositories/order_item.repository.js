import OrderItem from "../db/models/order_items";
import Item from "../db/models/Item";
import { orderItemState } from "../constants.js";

class OrderItemRepository {
  static async addOrderItem(itemId) {
    try {
      // 발주의 기본 상태(default state)는 0
      const orderItem = await OrderItem.create({
        item_id: itemId,
        amount: 1, // 발주 수량을 1로 설정 혹은 다른 값으로 설정 추후 수정
        state: orderItemState.ORDERED,
      });

      return orderItem;
    } catch (err) {
      throw err;
    }
  }

  static async updateOrderItemState(id, state) {
    try {
      const orderItem = await OrderItem.findByPk(id, { include: Item });

      if (!orderItem) {
        throw new Error("발주 내역을 찾을 수 없습니다.");
      }

      // 상태 변경 로직
      switch (state) {
        case orderItemState.PENDING:
          orderItem.state = orderItemState.PENDING;
          break;
        case orderItemState.COMPLETED:
          if (orderItem.state !== orderItemState.PENDING) {
            throw new Error("상태 변경이 불가능합니다.");
          }
          // 트랜잭션 적용하여 상태 변경과 동시에 상품의 amount를 증가
          await sequelize.transaction(async (t) => {
            await orderItem.update(
              { state: orderItemState.COMPLETED },
              { transaction: t }
            );
            await orderItem.item.increment("amount", {
              by: orderItem.amount,
              transaction: t,
            });
          });
          break;
        case orderItemState.CANCELED:
          if (orderItem.state === orderItemState.COMPLETED) {
            throw new Error(
              "주문한 수량보다 현재 수량이 적어 발주 취소가 불가능합니다."
            );
          }
          // 트랜잭션 적용하여 상태 변경과 동시에 상품의 amount를 감소
          await sequelize.transaction(async (t) => {
            await orderItem.update(
              { state: orderItemState.CANCELED },
              { transaction: t }
            );
            await orderItem.item.decrement("amount", {
              by: orderItem.amount,
              transaction: t,
            });
          });
          break;
        default:
          throw new Error("잘못된 발주 상태입니다.");
      }

      return orderItem;
    } catch (err) {
      throw err;
    }
  }
}

export default OrderItemRepository;
