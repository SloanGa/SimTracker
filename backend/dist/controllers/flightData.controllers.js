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
exports.flightDataControllers = void 0;
const dataMapper_1 = require("../data/dataMapper");
exports.flightDataControllers = {
    getFlightData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                try {
                    const currentPage = req.query.currentPage || 1;
                    const offset = (Number(currentPage) - 1) * 10;
                    const flightData = yield dataMapper_1.dataMapper.getFlightData(req.user.id, offset);
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
    getAllFlightData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                try {
                    const flightData = yield dataMapper_1.dataMapper.getAllFlightData(req.user.id);
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
                    if (isNaN(flight_time) || flight_time <= 0) {
                        res.status(400).json({ message: "Veuillez saisir un nombre en minutes" });
                        return;
                    }
                    if (!date) {
                        res.status(400).json({ message: "Veuillez saisir un vol valide" });
                        return;
                    }
                    if (arrival.length !== 4 || departure.length !== 4) {
                        res
                            .status(400)
                            .json({ message: "Veuillez saisir un aéroport au format ICAO (4 caractères)" });
                        return;
                    }
                    yield dataMapper_1.dataMapper.addFlightData(email, date, flight_number, departure, arrival, flight_time, aircraft);
                    res.status(200).json({ message: "Vol ajouté avec succés" });
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
    deleteFlight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                yield dataMapper_1.dataMapper.deleteFlightData(id);
                res.status(200).json("Flight data has deleted");
            }
            catch (e) {
                res
                    .status(500)
                    .json({ message: "Une erreur est survenue lors de la suppression. Veuillez réesayer" });
            }
        });
    },
};
//# sourceMappingURL=flightData.controllers.js.map