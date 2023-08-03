import ItemOrderCustomer from "../db/models/item_order_customers";
import OrderCustomer from "../db/models/order_customers";
import Items from "../db/models/Item";

class OrderController {
  static async createOrder(req, res) {
    try {
      const { items } = req.body;

      // 주문 정보 생성
      const order = await OrderCustomer.create({ state: false });

      // 주문한 모든 상품 가격의 합을 저장할 변수
      let totalOrderPrice = 0;

      // 상품 주문 목록 생성
      for (const item of items) {
        const { itemId, price } = item;

        // 주문한 모든 상품 가격의 합 추가
        totalOrderPrice += price;

        // 상품 주문 목록 저장
        await ItemOrderCustomer.create({
          orderId: order.id,
          itemId,
          price,
        });
      }

      return res.json({ orderId: order.id, totalOrderPrice });
    } catch (error) {
      console.error("Error while creating order:", error);
      return res.status(500).json({ error: "Error while creating order." });
    }
  }

  static async updateOrder(req, res) {
    try {
      const { orderId, state } = req.body;

      // 주문 상태 변경
      if (state === "completed") {
        // 주문 완료 처리
        const order = await OrderCustomer.findByPk(orderId);
        if (!order) {
          return res.status(404).json({ error: "Order not found." });
        }

        // 트랜잭션 처리 시작
        const t = await sequelize.transaction();

        try {
          // 주문 완료 처리
          await OrderCustomer.update(
            { state: true },
            { where: { id: orderId }, transaction: t }
          );

          // 해당 주문의 아이템 목록 조회
          const orderItems = await ItemOrderCustomer.findAll({
            where: { orderId },
          });

          // 주문한 아이템들의 수량 감소 처리
          for (const orderItem of orderItems) {
            const item = await Items.findByPk(orderItem.itemId);
            if (!item) {
              // 해당 상품이 존재하지 않을 경우 롤백
              await t.rollback();
              return res.status(500).json({ error: "Item not found." });
            }

            // 주문한 수량보다 현재 수량이 적을 경우 롤백
            if (item.amount < orderItem.amount) {
              await t.rollback();
              return res
                .status(400)
                .json({ error: "Not enough amount in stock." });
            }

            // 아이템의 수량 감소 처리
            await Items.update(
              { amount: item.amount - orderItem.amount },
              { where: { id: orderItem.itemId }, transaction: t }
            );
          }

          // 트랜잭션 커밋
          await t.commit();

          return res.json({ message: "Order completed successfully." });
        } catch (error) {
          // 트랜잭션 롤백
          await t.rollback();
          console.error("Error while completing order:", error);
          return res
            .status(500)
            .json({ error: "Error while completing order." });
        }
      } else if (state === "canceled") {
        // 주문 취소 처리
        const order = await OrderCustomer.findByPk(orderId);
        if (!order) {
          return res.status(404).json({ error: "Order not found." });
        }

        // 주문이 완료된 상태일 경우 취소 불가능
        if (order.state) {
          return res
            .status(400)
            .json({ error: "Completed orders cannot be canceled." });
        }

        // 트랜잭션 처리 시작
        const t = await sequelize.transaction();

        try {
          // 주문과 주문에 속한 아이템 목록 삭제
          await Promise.all([
            OrderCustomer.destroy({ where: { id: orderId }, transaction: t }),
            ItemOrderCustomer.destroy({ where: { orderId }, transaction: t }),
          ]);

          // 트랜잭션 커밋
          await t.commit();

          return res.json({ message: "Order canceled successfully." });
        } catch (error) {
          // 트랜잭션 롤백
          await t.rollback();
          console.error("Error while canceling order:", error);
          return res
            .status(500)
            .json({ error: "Error while canceling order." });
        }
      } else {
        return res.status(400).json({ error: "Invalid state." });
      }
    } catch (error) {
      console.error("Error while updating order:", error);
      return res.status(500).json({ error: "Error while updating order." });
    }
  }
}

export default OrderController;
