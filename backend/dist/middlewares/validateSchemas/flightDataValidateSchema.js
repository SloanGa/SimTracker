"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateFlightData = void 0;
const joi_1 = __importDefault(require("joi"));
const validateCreateFlightData = (req, _res, next) => {
    const { date, flight_number, departure, arrival, flight_time, aircraft } = req.body;
    const schema = joi_1.default.object({
        date: joi_1.default.string().required().messages({
            "string.empty": "Le champ date ne doit pas être vide.",
            "any.required": "Le champ date est requis.",
        }),
        flight_number: joi_1.default.string().required().pattern(/[\S]/).messages({
            "string.empty": "Le champ numéro de vol ne doit pas être vide.",
            "any.required": "Le champ numéro de vol est requis.",
            "string.pattern.base": "Le champ numéro de vol doit contenir au moins un caractère non-espace.",
        }),
        departure: joi_1.default.string()
            .length(4)
            .pattern(/^[A-Z]{4}$/)
            .required()
            .messages({
            "string.empty": "Veuillez saisir un aéroport au format ICAO (4 caractères et majuscules).",
            "any.required": "Le champ départ est requis.",
            "string.length": "Veuillez saisir un aéroport au format ICAO (4 caractères et majuscules).",
            "string.pattern.base": "Veuillez saisir un aéroport au format ICAO (4 caractères et majuscules).",
        }),
        arrival: joi_1.default.string()
            .length(4)
            .pattern(/^[A-Z]{4}$/)
            .required()
            .messages({
            "string.empty": "Veuillez saisir un aéroport au format ICAO (4 caractères et majuscules).",
            "any.required": "Le champ départ est requis.",
            "string.length": "Veuillez saisir un aéroport au format ICAO (4 caractères et majuscules).",
            "string.pattern.base": "Veuillez saisir un aéroport au format ICAO (4 caractères et majuscules).",
        }),
        flight_time: joi_1.default.number().integer().greater(0).required().messages({
            "number.base": "Le temps de vol doit être en minutes.",
            "number.integer": "Le temps de vol doit être en minutes.",
            "number.greater": "Le temps de vol doit être supérieur à 0.",
            "any.required": "Le temps de vol est requis.",
        }),
        aircraft: joi_1.default.string().required().pattern(/[\S]/).messages({
            "string.empty": "Le champ avion ne doit pas être vide.",
            "any.required": "Le champ avion est requis.",
            "string.pattern.base": "Le champ avion doit contenir au moins un caractère non-espace.",
        }),
    });
    const { error } = schema.validate({
        date,
        flight_number,
        departure,
        arrival,
        flight_time,
        aircraft,
    });
    if (error) {
        return next(error);
    }
    return next();
};
exports.validateCreateFlightData = validateCreateFlightData;
//# sourceMappingURL=flightDataValidateSchema.js.map