import { Router } from "express";
import { apiControllers } from "../controllers/api.controllers";

const router = Router();

router.get("/flightdata", apiControllers.getFlightData);
router.get("/nextflightdata", apiControllers.getFlightData);
router.get("/previousflightdata", apiControllers.getFlightData);
router.post("/flightdata", apiControllers.postFlightData);
router.get("/deleteflight/:id", apiControllers.deleteFlight);

export default router;
