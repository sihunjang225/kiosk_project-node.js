import Item from "../models/items";
import OrderItem from "../models/order_items";

export default () => {
  OrderItem.belongsTo(Item, {
    targetKey: "id",
    foreignKey: "item_id",
  });
};
