"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const data_routes_1 = __importDefault(require("./data.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const api_routes_1 = __importDefault(require("./api.routes"));
const path_1 = require("path");
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use("/data", data_routes_1.default);
router.use("/user", user_routes_1.default);
router.use("/api", api_routes_1.default);
if (process.env.NODE_ENV === "production") {
    router.use(express_1.default.static((0, path_1.join)(__dirname, "../frontend/build")));
    router.get("*", (_req, res) => {
        res.sendFile((0, path_1.join)(__dirname, "../frontend/build", "index.html"));
    });
}
exports.default = router;
//# sourceMappingURL=routes.js.map