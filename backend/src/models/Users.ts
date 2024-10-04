import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/client";

export class Users extends Model {
  declare id: number;
  declare firstname: string;
  declare lastname: string;
  declare email: string;
  declare password: string;
  declare picture_url?: string;
  declare simbrief_id?: string;
}

Users.init(
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture_url: DataTypes.STRING,
    simbrief_id: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "users",
  },
);
