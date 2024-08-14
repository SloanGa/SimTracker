"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.json({ message: "Hello from the backend!" });
});
exports.default = router;
//# sourceMappingURL=data.routes.js.map