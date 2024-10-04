"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const catchErrors_1 = require("../middlewares/catchErrors");
const userValidateSchema_1 = require("../middlewares/validateSchemas/userValidateSchema");
const router = (0, express_1.Router)();
router.post("/signup", userValidateSchema_1.validateCreateUser, (0, catchErrors_1.catchErrors)(auth_controller_1.authController.signup));
router.post("/login", (0, catchErrors_1.catchErrors)(auth_controller_1.authController.login));
router.get("/logout", (0, catchErrors_1.catchErrors)(auth_controller_1.authController.logout));
router.get("/user", auth_controller_1.authController.isAuthenticated);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map