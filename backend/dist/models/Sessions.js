"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sessions = void 0;
const sequelize_1 = require("sequelize");
const client_1 = require("../database/client");
class Sessions extends sequelize_1.Model {
}
exports.Sessions = Sessions;
Sessions.init({
    sid: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    sess: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    expire: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: client_1.sequelize,
    tableName: "sessions",
    timestamps: false,
    indexes: [
        {
            name: "IDX_sessions_expire",
            fields: ["expire"],
        },
    ],
});
//# sourceMappingURL=Sessions.js.map