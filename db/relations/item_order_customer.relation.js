import Item_order_customer from "../models/item_order_customers";
import Order_customer from "../models/order_customers";
import Item from "../models/Item";

export default () => {
  Item_order_customer.belongsTo(Item, {
    targetKey: "id",
    foreignKey: "Item_id",
  });
  Item_order_customer.hasMany(Order_customer, {
    sourceKey: "id",
    foreignKey: "order_customer_id",
  });
};
