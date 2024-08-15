import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.get("/protected-data", isAuthenticated, (_req: Request, res: Response) => {
  res.json({ data: "This is protected data" });
});

router.post("/signup", authController.signup);
router.get("/logout", authController.logout);

export default router;
