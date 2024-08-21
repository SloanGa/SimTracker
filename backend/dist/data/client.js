"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    host: process.env.HOST_DB,
    database: process.env.NAME_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    port: 5432,
    ssl: true,
});
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