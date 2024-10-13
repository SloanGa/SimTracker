"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandlers_1 = require("./middlewares/errorHandlers");
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config({
    path: `.env.${process.env.NODE_ENV}`,
});
const app = (0, express_1.default)();
exports.default = app;
require("./config/sessions.config");
require("./config/passport.config");
require("./database/client");
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.REACT_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
app.use((0, cors_1.default)({
    origin: [process.env.REACT_URL, "http://localhost:4173", "http://localhost:5173"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(routes_1.default);
app.get("/", (_req, res) => {
    res.send("API SimTracker");
});
app.use(errorHandlers_1.notFound);
app.use(errorHandlers_1.errorHandler);
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map