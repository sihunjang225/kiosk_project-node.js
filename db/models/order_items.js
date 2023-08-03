import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import Items from "./items";

class Order_Items extends Model {}

Order_Items.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    item_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "Item",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM("ORDERED", "PENDING", "COMPLETED", "CANCELED"),
      defaultValue: "ORDERED",
    },
  },
  {
    sequelize,
    modelName: "Order_Items",
  }
);

Order_Items.belongsTo(Items, { foreignKey: "item_id", as: "item" });
Items.hasMany(Order_Items, { foreignKey: "item_id", as: "orderItems" });

export default Order_Items;
