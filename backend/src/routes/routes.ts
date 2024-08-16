import { Router } from "express";
import authRoutes from "./auth.routes";
import dataRoutes from "./data.routes";
import userRoutes from "./user.routes";
import { join } from "path";

const router = Router();

router.use("/auth", authRoutes);
router.use("/data", dataRoutes);
router.use("/user", userRoutes);

export default router;
