import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

router.get("/protected-data", isAuthenticated, (_req: Request, res: Response) => {
  res.json({ data: "This is protected data" });
});

export default router;
