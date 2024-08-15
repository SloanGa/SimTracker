"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_1.authController.signup);
router.post("/login", auth_controller_1.authController.login);
router.get("/logout", auth_controller_1.authController.logout);
router.get("/user", auth_controller_1.authController.isAuthenticated);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map