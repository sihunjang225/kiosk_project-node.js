import { OrderCustomer, ItemOrderCustomer, Items } from "../db/models";

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
        const { itemId, optionId, quantity } = item;

        // 상품 정보 조회
        const selectedItem = await Items.findByPk(itemId);
        if (!selectedItem) {
          return res
            .status(400)
            .json({ error: `해당 ID ${itemId}를 찾을 수 없습니다.` });
        }

        // 옵션 정보 조회
        let optionPrice = 0;
        let option = null;
        if (optionId) {
          option = await Option.findByPk(optionId);
          if (!option) {
            return res.status(400).json({
              error: `해당 ID ${optionId}의 옵션 정보를 찾을 수 없습니다.`,
            });
          }
          optionPrice = option.extra_price + option.shot_price;
        }

        // 상품 가격 계산 (상품 기본 가격 + 옵션 가격) * 수량
        const itemPrice = (selectedItem.price + optionPrice) * quantity;

        // 주문한 모든 상품 가격의 합 추가
        totalOrderPrice += itemPrice;

        // 상품 주문 목록 저장
        await ItemOrderCustomer.create({
          orderId: order.id,
          itemId,
          optionId,
          option: optionId ? JSON.stringify(option) : null,
          price: itemPrice,
        });
      }

      return res.json({ orderId: order.id, totalOrderPrice });
    } catch (error) {
      console.error("Error while creating order:", error);
      return res.status(500).json({ error: "Error while creating order." });
    }
  }
}

export default OrderController;
