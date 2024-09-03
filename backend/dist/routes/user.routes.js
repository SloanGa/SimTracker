"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get("/getuser", user_controller_1.userController.getUser);
router.post("/updateuser", user_controller_1.userController.updateUser);
router.delete("/deleteuser", user_controller_1.userController.deleteUser);
router.post("/resetpassword", user_controller_1.userController.resetPassword);
exports.default = router;
//# sourceMappingURL=user.routes.js.map