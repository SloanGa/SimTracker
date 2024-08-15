import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/user", authController.isAuthenticated);

export default router;
