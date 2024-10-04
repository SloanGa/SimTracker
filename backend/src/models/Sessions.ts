import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/client";

export class Sessions extends Model {}

Sessions.init(
  {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    sess: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    expire: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "sessions",
    timestamps: false,
    indexes: [
      {
        name: "IDX_sessions_expire",
        fields: ["expire"],
      },
    ],
  },
);
