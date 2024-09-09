import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateUpdateUser = (req: Request, _res: Response, next: NextFunction) => {
  const { firstname, lastname, email, password, confirm } = req.body;

  const schema = Joi.object({
    firstname: Joi.string().min(2).allow("").pattern(/[\S]/).messages({
      "string.pattern.base": "Le champ prénom doit contenir au moins un caractère non-espace.",
      "string.empty": "Le champ prenom ne doit pas être vide.",
      "string.min": "Le champ prenom doit contenir au moins {#limit} caractères.",
    }),
    lastname: Joi.string().min(2).allow("").messages({
      "string.pattern.base": "Le champ nom doit contenir au moins un caractère non-espace.",
      "string.empty": "Le champ nom ne doit pas être vide.",
      "string.min": "Le champ nom doit contenir au moins {#limit} caractères.",
    }),
    email: Joi.string().email().allow("").pattern(/[\S]/).messages({
      "string.base": "L'email doit être une chaîne de caractères.",
      "string.email": "Veuillez entrer un email valide : exemple@exemple.fr",
    }),
    password: Joi.string().min(8).allow("").messages({
      "string.base": "Le mot de passe doit être une chaîne de caractères.",
      "string.min": "Le mot de passe doit contenir au moins 8 caractères.",
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

export const validateCreateUser = (req: Request, _res: Response, next: NextFunction) => {
  const { firstname, lastname, email, password, confirm } = req.body;

  const schema = Joi.object({
    firstname: Joi.string().min(2).required().pattern(/[\S]/).messages({
      "string.empty": "Le champ prenom ne doit pas être vide.",
      "string.pattern.base": "Le champ prénom doit contenir au moins un caractère non-espace.",
      "string.min": "Le champ prenom doit contenir au moins {#limit} caractères.",
      "any.required": "Tous les champs sont requis.",
    }),
    lastname: Joi.string().min(2).required().pattern(/[\S]/).messages({
      "string.empty": "Le champ nom ne doit pas être vide.",
      "string.pattern.base": "Le champ nom doit contenir au moins un caractère non-espace.",
      "string.min": "Le champ nom doit contenir au moins {#limit} caractères.",
      "any.required": "Tous les champs sont requis.",
    }),
    email: Joi.string().email().required().pattern(/[\S]/).messages({
      "string.base": "L'email doit être une chaîne de caractères.",
      "string.pattern.base": "Le champ email doit contenir au moins un caractère non-espace.",
      "string.email": "Veuillez entrer un email valide : exemple@exemple.fr",
      "any.required": "Tous les champs sont requis.",
    }),
    password: Joi.string().min(8).required().messages({
      "string.base": "Le mot de passe doit être une chaîne de caractères.",
      "string.min": "Le mot de passe doit contenir au moins 8 caractères.",
      "any.required": "Tous les champs sont requis.",
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

export const validateEmailResetPassword = (req: Request, _res: Response, next: NextFunction) => {
  const { email } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().allow("").messages({
      "string.base": "L'email doit être une chaîne de caractères.",
      "string.email": "Veuillez entrer un email valide : exemple@exemple.fr",
    }),
  });

  const { error } = schema.validate({ email });

  if (error) {
    return next(error);
  }

  return next();
};

export const validateUpdatePassword = (req: Request, _res: Response, next: NextFunction) => {
  const { password, confirm } = req.body;

  const schema = Joi.object({
    password: Joi.string().min(8).required().messages({
      "string.base": "Le mot de passe doit être une chaîne de caractères.",
      "string.min": "Le mot de passe doit contenir au moins 8 caractères.",
      "string.empty": "Le mot de passe est requis.",
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

  const { error } = schema.validate({ password, confirm });

  if (error) {
    return next(error);
  }

  return next();
};
