"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const client = new pg_1.Client(process.env.PG_URL);
client.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected to database Simtracker");
    }
});
exports.default = client;
//# sourceMappingURL=client.js.map