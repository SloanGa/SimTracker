"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.get("/protected-data", isAuthenticated_1.isAuthenticated, (_req, res) => {
    res.json({ data: "This is protected data" });
});
router.post("/signup", authController_1.authController.signup);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map