import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/client";

export class FlightLogContent extends Model {
  declare id: number;
  declare date: string;
  declare flight_number: string;
  declare departure: string;
  declare arrival: string;
  declare flight_time: number;
  declare aircraft_name: string;
}

FlightLogContent.init(
  {
    date: DataTypes.STRING,
    flight_number: DataTypes.STRING,
    departure: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 4],
          msg: "Departure must be exactly 4 characters long.",
        },
      },
    },
    arrival: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 4],
          msg: "Departure must be exactly 4 characters long.",
        },
      },
    },
    flight_time: DataTypes.INTEGER,
    aircraft_name: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "flight_log_content",
  },
);
