import Item from "../models/Item";
import Order_Items from "../models/order_items";
import Item_order_customer from "../models/item_order_customers";
export default () => {
  Item.hasMany(Order_Items, {
    sourceKey: "id",
    foreignKey: "Item_id",
  });
  Item.hasMany(Item_order_customer, {
    sourceKey: "id",
    foreignKey: "Item_id",
  });
};
