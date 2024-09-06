import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { catchErrors } from "../middlewares/catchErrors";
import { validateCreateUser } from "../middlewares/validateSchemas/userValidateSchema";

const router = Router();

router.post("/signup", validateCreateUser, catchErrors(authController.signup));
router.post("/login", catchErrors(authController.login));
router.get("/logout", catchErrors(authController.logout));
router.get("/user", authController.isAuthenticated);

export default router;
