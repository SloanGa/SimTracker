"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: `.env.${process.env.NODE_ENV}`,
});
exports.sequelize = new sequelize_1.Sequelize(process.env.PG_URL, {
    dialect: "postgres",
    logging: false,
    define: {
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscored: true,
    },
});
exports.sequelize
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
})
    .catch((error) => {
    console.error("Unable to connect to the database:", error);
});
//# sourceMappingURL=client.js.map