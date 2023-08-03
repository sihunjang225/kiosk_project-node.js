import Item from "../models/Item";
import Order_Items from "../models/order_items";

export default () => {
  Order_Items.belongsTo(Item, {
    targetKey: "id",
    foreignKey: "Item_id",
  });
};
