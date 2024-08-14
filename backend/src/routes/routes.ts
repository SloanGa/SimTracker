import express, { Router, Request, Response } from "express";
import authRoutes from "./auth.routes";
import dataRoutes from "./data.routes";
import { join } from "path";

const router = Router();

router.use("/auth", authRoutes);
router.use("/data", dataRoutes);

if (process.env.NODE_ENV === "production") {
  router.use(express.static(join(__dirname, "../frontend/build")));

  router.get("*", (_req: Request, res: Response) => {
    res.sendFile(join(__dirname, "../frontend/build", "index.html"));
  });
}

export default router;
