"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_1 = require("sequelize");
const client_1 = require("../database/client");
class Users extends sequelize_1.Model {
}
exports.Users = Users;
Users.init({
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    picture_url: sequelize_1.DataTypes.STRING,
    simbrief_id: sequelize_1.DataTypes.STRING,
}, {
    sequelize: client_1.sequelize,
    tableName: "users",
});
//# sourceMappingURL=Users.js.map