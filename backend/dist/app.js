"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = require("path");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static((0, path_1.join)(__dirname, "../frontend/build")));
    app.get("*", (_req, res) => {
        res.sendFile((0, path_1.join)(__dirname, "../frontend/build", "index.html"));
    });
}
app.get("/api/data", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.json({ message: "Hello from the backend!" });
});
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map