"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flightData_controllers_1 = require("../controllers/flightData.controllers");
const router = (0, express_1.Router)();
router.get("/", flightData_controllers_1.flightDataControllers.getFlightData);
router.get("/allflightsdata", flightData_controllers_1.flightDataControllers.getAllFlightData);
router.get("/nextflightdata", flightData_controllers_1.flightDataControllers.getFlightData);
router.get("/previousflightdata", flightData_controllers_1.flightDataControllers.getFlightData);
router.post("/", flightData_controllers_1.flightDataControllers.postFlightData);
router.delete("/deleteflight/:id(\\d+)", flightData_controllers_1.flightDataControllers.deleteFlight);
exports.default = router;
//# sourceMappingURL=flightData.routes.js.map