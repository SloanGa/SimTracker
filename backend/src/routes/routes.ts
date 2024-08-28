import { Router } from "express";
import authRoutes from "./auth.routes";
// import dataRoutes from "./data.routes";
import userRoutes from "./user.routes";
import apiRoutes from "./api.routes";

const router = Router();

router.use("/auth", authRoutes);
// router.use("/data", dataRoutes);
router.use("/user", userRoutes);
router.use("/api", apiRoutes);

export default router;
