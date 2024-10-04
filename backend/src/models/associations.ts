import { Users } from "./Users";
import { FlightLogContent } from "./FlightLogContent";

Users.hasMany(FlightLogContent, {
  foreignKey: "user_id",
  as: "flightLogs",
});

FlightLogContent.hasOne(Users, {
  foreignKey: "user_id",
  as: "user",
});

export { Users, FlightLogContent };
