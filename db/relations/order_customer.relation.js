import Item_order_customer from "../models/item_order_customers";
import Item from "../models/Item";

export default () => {
  Item_order_customer.belongsTo(Item, {
    targetKey: "id",
    foreignKey: "order_customer_id",
  });
};
