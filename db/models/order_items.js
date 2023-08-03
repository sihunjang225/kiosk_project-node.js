import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

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

export default Order_Items;
