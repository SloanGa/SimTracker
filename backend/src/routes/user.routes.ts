import { Router } from "express";
import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/getuser", userController.getUser);
router.delete("/deleteuser/:id(\\d+)", userController.deleteUser);

export default router;
