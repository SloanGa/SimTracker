import { Router } from "express";
import { flightDataControllers } from "../controllers/flightData.controllers";

const router = Router();

router.get("/", flightDataControllers.getFlightData);
router.get("/allflightsdata", flightDataControllers.getAllFlightData);
router.get("/nextflightdata", flightDataControllers.getFlightData);
router.get("/previousflightdata", flightDataControllers.getFlightData);
router.post("/flightdata", flightDataControllers.postFlightData);
router.delete("/deleteflight/:id(\\d+)", flightDataControllers.deleteFlight);

export default router;
