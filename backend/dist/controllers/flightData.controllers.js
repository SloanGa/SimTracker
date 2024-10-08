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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightDataControllers = void 0;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const FlightLogContent_1 = require("../models/FlightLogContent");
exports.flightDataControllers = {
    getFlightData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                return next();
            }
            const currentPage = req.query.currentPage || 1;
            const limit = 10;
            const offset = (Number(currentPage) - 1) * 10;
            const flightData = yield FlightLogContent_1.FlightLogContent.findAll({
                where: {
                    user_id: req.user.id,
                },
                limit: limit,
                offset: offset,
            });
            return res.json(flightData);
        });
    },
    getAllFlightData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                return next();
            }
            const flightData = yield FlightLogContent_1.FlightLogContent.findAll({
                where: {
                    user_id: req.user.id,
                },
            });
            return res.json(flightData);
        });
    },
    postFlightData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                return next();
            }
            const { date, flight_number, departure, arrival, flight_time, aircraft } = req.body;
            yield FlightLogContent_1.FlightLogContent.create({
                date: date,
                flight_number: (0, sanitize_html_1.default)(flight_number),
                departure: (0, sanitize_html_1.default)(departure),
                arrival: (0, sanitize_html_1.default)(arrival),
                flight_time: flight_time,
                aircraft_name: (0, sanitize_html_1.default)(aircraft),
                user_id: req.user.id,
            });
            res.json({ message: "Vol ajouté avec sucées" });
        });
    },
    deleteFlight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield FlightLogContent_1.FlightLogContent.destroy({
                where: { id: id },
            });
            res.json("Flight data has deleted");
        });
    },
};
//# sourceMappingURL=flightData.controllers.js.map