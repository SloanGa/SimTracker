import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { authController } from "../controllers/authController";

const router = Router();

router.get("/protected-data", isAuthenticated, (_req: Request, res: Response) => {
  res.json({ data: "This is protected data" });
});

router.post("/signup", authController.signup);

export default router;
