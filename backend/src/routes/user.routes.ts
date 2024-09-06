import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { catchErrors } from "../middlewares/catchErrors";
import {
  validateEmailResetPassword,
  validateUpdateUser,
} from "../middlewares/validateSchemas/userValidateSchema";

const router = Router();

router.get("/", catchErrors(userController.all));
router.get("/getuser", catchErrors(userController.getUser));
router.patch("/updateuser", validateUpdateUser, catchErrors(userController.updateUser));
router.delete("/deleteuser", catchErrors(userController.deleteUser));
router.post(
  "/resetpassword",
  validateEmailResetPassword,
  catchErrors(userController.resetPassword)
);
router.get("/resetpassword/confirm", catchErrors(userController.resetPasswordConfirm));

export default router;
