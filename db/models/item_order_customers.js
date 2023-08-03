import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

class ItemOrderCustomer extends Model {}

ItemOrderCustomer.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    optionId: {
      type: DataTypes.BIGINT,
    },
    option: {
      type: DataTypes.JSON,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "ItemOrderCustomer",
  }
);

export default ItemOrderCustomer;
