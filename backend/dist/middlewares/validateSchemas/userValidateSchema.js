"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdatePassword = exports.validateEmailResetPassword = exports.validateCreateUser = exports.validateUpdateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUpdateUser = (req, _res, next) => {
    const { firstname, lastname, email, password, confirm } = req.body;
    const schema = joi_1.default.object({
        firstname: joi_1.default.string().min(2).allow("").pattern(/[\S]/).messages({
            "string.pattern.base": "Le champ prénom doit contenir au moins un caractère non-espace.",
            "string.empty": "Le champ prenom ne doit pas être vide.",
            "string.min": "Le champ prenom doit contenir au moins {#limit} caractères.",
        }),
        lastname: joi_1.default.string().min(2).allow("").messages({
            "string.pattern.base": "Le champ nom doit contenir au moins un caractère non-espace.",
            "string.empty": "Le champ nom ne doit pas être vide.",
            "string.min": "Le champ nom doit contenir au moins {#limit} caractères.",
        }),
        email: joi_1.default.string().email().allow("").pattern(/[\S]/).messages({
            "string.base": "L'email doit être une chaîne de caractères.",
            "string.email": "Veuillez entrer un email valide : exemple@exemple.fr",
        }),
        password: joi_1.default.string().allow("").messages({
            "string.base": "Le mot de passe doit être une chaîne de caractères.",
        }),
        confirm: joi_1.default.string()
            .valid(joi_1.default.ref("password"))
            .when("password", {
            is: joi_1.default.exist(),
            then: joi_1.default.required(),
            otherwise: joi_1.default.forbidden(),
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
exports.validateUpdateUser = validateUpdateUser;
const validateCreateUser = (req, _res, next) => {
    const { firstname, lastname, email, password, confirm } = req.body;
    const schema = joi_1.default.object({
        firstname: joi_1.default.string().min(2).required().pattern(/[\S]/).messages({
            "string.empty": "Le champ prenom ne doit pas être vide.",
            "string.pattern.base": "Le champ prénom doit contenir au moins un caractère non-espace.",
            "string.min": "Le champ prenom doit contenir au moins {#limit} caractères.",
            "any.required": "Tous les champs sont requis.",
        }),
        lastname: joi_1.default.string().min(2).required().pattern(/[\S]/).messages({
            "string.empty": "Le champ nom ne doit pas être vide.",
            "string.pattern.base": "Le champ nom doit contenir au moins un caractère non-espace.",
            "string.min": "Le champ nom doit contenir au moins {#limit} caractères.",
            "any.required": "Tous les champs sont requis.",
        }),
        email: joi_1.default.string().email().required().pattern(/[\S]/).messages({
            "string.base": "L'email doit être une chaîne de caractères.",
            "string.pattern.base": "Le champ email doit contenir au moins un caractère non-espace.",
            "string.email": "Veuillez entrer un email valide : exemple@exemple.fr",
            "any.required": "Tous les champs sont requis.",
        }),
        password: joi_1.default.string().required().messages({
            "string.base": "Le mot de passe doit être une chaîne de caractères.",
            "any.required": "Tous les champs sont requis.",
        }),
        confirm: joi_1.default.string()
            .valid(joi_1.default.ref("password"))
            .when("password", {
            is: joi_1.default.exist(),
            then: joi_1.default.required(),
            otherwise: joi_1.default.forbidden(),
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
exports.validateCreateUser = validateCreateUser;
const validateEmailResetPassword = (req, _res, next) => {
    const { email } = req.body;
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().allow("").messages({
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
exports.validateEmailResetPassword = validateEmailResetPassword;
const validateUpdatePassword = (req, _res, next) => {
    const { password, confirm } = req.body;
    const schema = joi_1.default.object({
        password: joi_1.default.string().required().messages({
            "string.base": "Le mot de passe doit être une chaîne de caractères.",
            "string.empty": "Le mot de passe est requis.",
        }),
        confirm: joi_1.default.string()
            .valid(joi_1.default.ref("password"))
            .when("password", {
            is: joi_1.default.exist(),
            then: joi_1.default.required(),
            otherwise: joi_1.default.forbidden(),
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
exports.validateUpdatePassword = validateUpdatePassword;
//# sourceMappingURL=userValidateSchema.js.map