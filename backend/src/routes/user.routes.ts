import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { catchErrors } from "../middlewares/catchErrors";

const router = Router();

router.get("/all", catchErrors(userController.all));
router.get("/getuser", catchErrors(userController.getUser));
router.post("/updateuser", catchErrors(userController.updateUser));
router.delete("/deleteuser", catchErrors(userController.deleteUser));
router.post("/resetpassword", catchErrors(userController.resetPassword));

export default router;
