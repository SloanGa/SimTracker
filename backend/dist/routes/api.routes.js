"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_controllers_1 = require("../controllers/api.controllers");
const router = (0, express_1.Router)();
router.get("/flightdata", api_controllers_1.apiControllers.getFlightData);
router.get("/nextflightdata", api_controllers_1.apiControllers.getFlightData);
router.get("/previousflightdata", api_controllers_1.apiControllers.getFlightData);
router.post("/flightdata", api_controllers_1.apiControllers.postFlightData);
exports.default = router;
//# sourceMappingURL=api.routes.js.map