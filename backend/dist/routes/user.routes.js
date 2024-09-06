"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const catchErrors_1 = require("../middlewares/catchErrors");
const userValidateSchema_1 = require("../middlewares/validateSchemas/userValidateSchema");
const router = (0, express_1.Router)();
router.get("/", (0, catchErrors_1.catchErrors)(user_controller_1.userController.all));
router.get("/getuser", (0, catchErrors_1.catchErrors)(user_controller_1.userController.getUser));
router.patch("/updateuser", userValidateSchema_1.validateUpdateUser, (0, catchErrors_1.catchErrors)(user_controller_1.userController.updateUser));
router.delete("/deleteuser", (0, catchErrors_1.catchErrors)(user_controller_1.userController.deleteUser));
router.post("/resetpassword", userValidateSchema_1.validateEmailResetPassword, (0, catchErrors_1.catchErrors)(user_controller_1.userController.resetPassword));
router.get("/resetpassword/confirm", (0, catchErrors_1.catchErrors)(user_controller_1.userController.resetPasswordConfirm));
router.patch("/updatepassword", userValidateSchema_1.validateUpdatePassword, (0, catchErrors_1.catchErrors)(user_controller_1.userController.updatePassword));
exports.default = router;
//# sourceMappingURL=user.routes.js.map