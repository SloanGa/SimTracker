import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.json({ message: "Hello from the backend!" });
});

export default router;
