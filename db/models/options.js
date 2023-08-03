import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

class Option extends Model {}

Option.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    extra_price: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    shot_price: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    hot: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    modelName: "Option",
  }
);

export default Option;
