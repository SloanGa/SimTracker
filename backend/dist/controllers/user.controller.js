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
exports.userController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const resetPasswordDev_1 = require("../email/resetPasswordDev");
const resetPasswordProd_1 = require("../email/resetPasswordProd");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const Users_1 = require("../models/Users");
dotenv_1.default.config();
exports.userController = {
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                return next();
            }
            const user = yield Users_1.Users.findByPk(req.user.id, {
                attributes: {
                    exclude: ["password"],
                },
            });
            if (!user) {
                return next();
            }
            return res.json(user);
        });
    },
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                return next();
            }
            yield Users_1.Users.destroy({ where: { id: req.user.id } });
            req.logout(() => {
                return res.status(204).json("L'utilisateur a été supprimé");
            });
        });
    },
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, email, password, simbrief_id } = req.body;
            if (!req.user) {
                return next();
            }
            let hashedPassword = "";
            if (password) {
                hashedPassword = yield bcrypt_1.default.hash(password, 10);
            }
            yield Users_1.Users.update({
                firstname: (0, sanitize_html_1.default)(firstname),
                lastname: (0, sanitize_html_1.default)(lastname),
                email: (0, sanitize_html_1.default)(email),
                password: hashedPassword,
                simbrief_id: (0, sanitize_html_1.default)(simbrief_id),
            }, {
                where: { id: Number(req.user.id) },
            });
            const user = yield Users_1.Users.findByPk(req.user.id, {
                attributes: {
                    exclude: ["password"],
                },
            });
            return res.json({ user: user, message: "Modifications prises en compte" });
        });
    },
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const user = yield Users_1.Users.findOne({ where: { email: email } });
            if (!user) {
                const error = { message: "Email non reconnu" };
                return next(error);
            }
            if (process.env.NODE_ENV === "development") {
                (0, resetPasswordDev_1.sendMailResetPasswordDev)(user);
            }
            else {
                (0, resetPasswordProd_1.sendMailResetPasswordProd)(user);
            }
            res.json({ message: "Email envoyé. (Vérifiez les mails indésirables)" });
        });
    },
    resetPasswordConfirm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.query.token;
            if (!token) {
                return next();
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                const error = { message: "Ce lien est expiré" };
                return next(error);
            }
            return res.json(decoded);
        });
    },
    updatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, password } = req.body;
            const user = Users_1.Users.findByPk(userId);
            if (!user) {
                const error = { message: "Une erreur est survenu. Veuillez réesaeyer." };
                return next(error);
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            yield Users_1.Users.update({
                password: hashedPassword,
            }, { where: { id: userId } });
            res.json({ message: "Modification prise en compte" });
        });
    },
};
//# sourceMappingURL=user.controller.js.map