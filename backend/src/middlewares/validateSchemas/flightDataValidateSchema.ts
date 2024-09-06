import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateCreateFlightData = (req: Request, _res: Response, next: NextFunction) => {
  const { date, flight_number, departure, arrival, flight_time, aircraft } = req.body;

  const schema = Joi.object({
    date: Joi.string().required().messages({
      "string.empty": "Le champ date ne doit pas être vide.",
      "any.required": "Le champ date est requis.",
    }),
    flight_number: Joi.string().required().pattern(/[\S]/).messages({
      "string.empty": "Le champ numéro de vol ne doit pas être vide.",
      "any.required": "Le champ numéro de vol est requis.",
      "string.pattern.base":
        "Le champ numéro de vol doit contenir au moins un caractère non-espace.",
    }),
    departure: Joi.string()
      .length(4)
      .pattern(/^[A-Z]{4}$/) // Assure que le code ICAO contient uniquement des lettres majuscules
      .required()
      .messages({
        "string.empty": "Veuillez saisir un aéroport au format ICAO (4 caractères et majuscules).",
        "any.required": "Le champ départ est requis.",
        "string.length": "Veuillez saisir un aéroport au format ICAO (4 caractères et majuscules).",
        "string.pattern.base":
          "Veuillez saisir un aéroport au format ICAO (4 caractères et majuscules).",
      }),
    arrival: Joi.string()
      .length(4)
      .pattern(/^[A-Z]{4}$/) // Assure que le code ICAO contient uniquement des lettres majuscules
      .required()
      .messages({
        "string.empty": "Veuillez saisir un aéroport au format ICAO (4 caractères et majuscules).",
        "any.required": "Le champ départ est requis.",
        "string.length": "Veuillez saisir un aéroport au format ICAO (4 caractères et majuscules).",
        "string.pattern.base":
          "Veuillez saisir un aéroport au format ICAO (4 caractères et majuscules).",
      }),

    flight_time: Joi.number().integer().greater(0).required().messages({
      "number.base": "Le temps de vol doit être en minutes.",
      "number.integer": "Le temps de vol doit être en minutes.",
      "number.greater": "Le temps de vol doit être supérieur à 0.",
      "any.required": "Le temps de vol est requis.",
    }),
    aircraft: Joi.string().required().pattern(/[\S]/).messages({
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
