"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flightData_controllers_1 = require("../controllers/flightData.controllers");
const catchErrors_1 = require("../middlewares/catchErrors");
const flightDataValidateSchema_1 = require("../middlewares/validateSchemas/flightDataValidateSchema");
const router = (0, express_1.Router)();
router.get("/", (0, catchErrors_1.catchErrors)(flightData_controllers_1.flightDataControllers.getFlightData));
router.get("/allflightsdata", (0, catchErrors_1.catchErrors)(flightData_controllers_1.flightDataControllers.getAllFlightData));
router.get("/nextflightdata", (0, catchErrors_1.catchErrors)(flightData_controllers_1.flightDataControllers.getFlightData));
router.get("/previousflightdata", (0, catchErrors_1.catchErrors)(flightData_controllers_1.flightDataControllers.getFlightData));
router.post("/", flightDataValidateSchema_1.validateCreateFlightData, (0, catchErrors_1.catchErrors)(flightData_controllers_1.flightDataControllers.postFlightData));
router.delete("/deleteflight/:id(\\d+)", (0, catchErrors_1.catchErrors)(flightData_controllers_1.flightDataControllers.deleteFlight));
exports.default = router;
//# sourceMappingURL=flightData.routes.js.map