"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightLogContent = exports.Users = void 0;
const Users_1 = require("./Users");
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return Users_1.Users; } });
const FlightLogContent_1 = require("./FlightLogContent");
Object.defineProperty(exports, "FlightLogContent", { enumerable: true, get: function () { return FlightLogContent_1.FlightLogContent; } });
Users_1.Users.hasMany(FlightLogContent_1.FlightLogContent, {
    foreignKey: "user_id",
    as: "flightLogs",
});
FlightLogContent_1.FlightLogContent.hasOne(Users_1.Users, {
    foreignKey: "user_id",
    as: "user",
});
//# sourceMappingURL=associations.js.map