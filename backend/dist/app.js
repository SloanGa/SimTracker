"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
require("./data/client");
const app = (0, express_1.default)();
exports.default = app;
require("./config/sessions.config");
require("./config/passport.config");
if (process.env.NODE_ENV !== "production") {
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
}
app.use(express_1.default.json());
app.use(routes_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(process.env.REACT_APP_FRONTEND_BUILD_PATH || ""));
    console.log(process.env.REACT_APP_FRONTEND_BUILD_PATH);
    app.get("*", (_req, res) => {
        res.sendFile(process.env.REACT_APP_FRONTEND_BUILD_PATH || "");
    });
}
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map