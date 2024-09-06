import { Router } from "express";
import { flightDataControllers } from "../controllers/flightData.controllers";
import { catchErrors } from "../middlewares/catchErrors";
import { validateCreateFlightData } from "../middlewares/validateSchemas/flightDataValidateSchema";

const router = Router();

router.get("/", catchErrors(flightDataControllers.getFlightData));
router.get("/allflightsdata", catchErrors(flightDataControllers.getAllFlightData));
router.get("/nextflightdata", catchErrors(flightDataControllers.getFlightData));
router.get("/previousflightdata", catchErrors(flightDataControllers.getFlightData));
router.post("/", validateCreateFlightData, catchErrors(flightDataControllers.postFlightData));
router.delete("/deleteflight/:id(\\d+)", catchErrors(flightDataControllers.deleteFlight));

export default router;
