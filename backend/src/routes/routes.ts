import { Router } from "express";
import authRoutes from "./auth.routes";
import dataRoutes from "./data.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/data", dataRoutes);

export default router;
