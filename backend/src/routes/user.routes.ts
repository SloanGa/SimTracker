import { Router } from "express";
import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/getuser", userController.getUser);
router.post("/updateuser", userController.updateUser);
router.delete("/deleteuser", userController.deleteUser);

export default router;
