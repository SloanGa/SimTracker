import { Router } from "express";
import { apiControllers } from "../controllers/api.controllers";

const router = Router();

router.get("/flightdata", apiControllers.getFlightData);
router.post("/flightdata", apiControllers.postFlightData);

export default router;
