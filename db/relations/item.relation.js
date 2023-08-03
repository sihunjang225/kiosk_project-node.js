import Item from "../models/items";
import OrderItem from "../models/order_items";
import Item_order_customer from "../models/item_order_customers";
export default () => {
  Item.hasMany(OrderItem, {
    sourceKey: "id",
    foreignKey: "item_id",
  });
  Item.hasMany(Item_order_customer, {
    sourceKey: "id",
    foreignKey: "item_id",
  });
};
