"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightLogContent = void 0;
const sequelize_1 = require("sequelize");
const client_1 = require("../database/client");
class FlightLogContent extends sequelize_1.Model {
}
exports.FlightLogContent = FlightLogContent;
FlightLogContent.init({
    date: sequelize_1.DataTypes.STRING,
    flight_number: sequelize_1.DataTypes.STRING,
    departure: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            len: {
                args: [4, 4],
                msg: "Departure must be exactly 4 characters long.",
            },
        },
    },
    arrival: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            len: {
                args: [4, 4],
                msg: "Departure must be exactly 4 characters long.",
            },
        },
    },
    flight_time: sequelize_1.DataTypes.INTEGER,
    aircraft_name: sequelize_1.DataTypes.STRING,
}, {
    sequelize: client_1.sequelize,
    tableName: "flight_log_content",
});
//# sourceMappingURL=FlightLogContent.js.map