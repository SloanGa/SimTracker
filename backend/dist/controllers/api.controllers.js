"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiControllers = void 0;
const dataMapper_1 = require("../data/dataMapper");
exports.apiControllers = {
    getFlightData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                try {
                    const flightData = yield dataMapper_1.dataMapper.getFlightData(req.user.id);
                    res.status(200).json(flightData);
                }
                catch (_a) {
                    res.status(500).json({ message: "Une erreur est survenue" });
                }
            }
            else {
                res.status(401).json({ message: "Unauthorized" });
            }
        });
    },
    postFlightData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                try {
                    const email = req.user.email;
                    const { date, flight_number, departure, arrival, flight_time, aircraft } = req.body;
                    yield dataMapper_1.dataMapper.addFlightData(email, date, flight_number, departure, arrival, flight_time, aircraft);
                    res.status(200).json("Flight data added successfully");
                }
                catch (e) {
                    res.status(500).json({ message: "Une erreur est survenue" });
                }
            }
            else {
                res.status(401).json({ message: "Unauthorized" });
            }
        });
    },
};
//# sourceMappingURL=api.controllers.js.map