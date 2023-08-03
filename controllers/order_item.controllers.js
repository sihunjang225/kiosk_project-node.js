import OrderItemService from "../services/order_item.services";

class OrderItemController {
  static async addOrderItem(req, res) {
    try {
      const { itemId } = req.body;
      const orderItem = await OrderItemService.addOrderItem(itemId);
      res.json({ message: "상품 발주가 완료되었습니다.", orderItem });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateOrderItemState(req, res) {
    try {
      const id = req.params.id;
      const state = req.body.state;
      const updatedOrderItem = await OrderItemService.updateOrderItemState(
        id,
        state
      );
      res.json({
        message: "발주 상태가 수정되었습니다.",
        orderItem: updatedOrderItem,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default OrderItemController;
