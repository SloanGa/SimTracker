import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { catchErrors } from "../middlewares/catchErrors";
import { validateUpdateUser } from "../middlewares/validateSchemas/userValidateSchema";

const router = Router();

router.get("/all", catchErrors(userController.all));
router.get("/getuser", catchErrors(userController.getUser));
router.patch("/updateuser", validateUpdateUser, catchErrors(userController.updateUser));
router.delete("/deleteuser", catchErrors(userController.deleteUser));
router.post("/resetpassword", catchErrors(userController.resetPassword));

export default router;
