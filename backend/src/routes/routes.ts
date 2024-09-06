import { Router } from "express";
import authRoutes from "./auth.routes";
// import dataRoutes from "./data.routes";
import userRoutes from "./user.routes";
import flightDataRoutes from "./flightData.routes";

const router = Router();

router.use("/auth", authRoutes);
// router.use("/data", dataRoutes);
router.use("/user", userRoutes);
router.use("/flightdata", flightDataRoutes);

export default router;
