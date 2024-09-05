import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateUpdateUser = (req: Request, _res: Response, next: NextFunction) => {
  const { firstname, lastname, email, password, confirm } = req.body;

  const schema = Joi.object({
    firstname: Joi.string().min(2).allow("").messages({
      "string.empty": "Le champ prenom ne doit pas être vide.",
      "string.min": "Le champ prenom doit contenir au moins {#limit} caractères.",
    }),
    lastname: Joi.string().min(2).allow("").messages({
      "string.empty": "Le champ nom ne doit pas être vide.",
      "string.min": "Le champ nom doit contenir au moins {#limit} caractères.",
    }),
    email: Joi.string().email().allow("").messages({
      "string.base": "L'email doit être une chaîne de caractères.",
      "string.email": "Veuillez entrer un email valide : exemple@exemple.fr",
    }),
    password: Joi.string().allow("").messages({
      "string.base": "Le mot de passe doit être une chaîne de caractères.",
    }),
    confirm: Joi.string()
      .valid(Joi.ref("password"))
      .when("password", {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      })
      .messages({
        "string.base": "La confirmation du mot de passe doit être une chaîne de caractères.",
        "any.only": "La confirmation du mot de passe doit correspondre au mot de passe.",
        "any.required": "La confirmation du mot de passe est requise.",
        "any.unknown": "Le mot de passe est requis.",
      }),
  });

  const { error } = schema.validate({ firstname, lastname, email, password, confirm });

  if (error) {
    return next(error);
  }

  return next();
};
