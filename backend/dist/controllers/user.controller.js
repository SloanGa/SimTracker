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
dotenv_1.default.config();
const dataMapper_1 = require("../data/dataMapper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.userController = {
    all(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                return next();
            }
            const users = yield dataMapper_1.dataMapper.findAllUsers();
            return res.json(users);
        });
    },
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                return next();
            }
            const user = yield dataMapper_1.dataMapper.findUserPerId(req.user.id);
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
            yield dataMapper_1.dataMapper.deleteUser(Number(req.user.id));
            req.logout(() => {
                return res.status(204).json("L'utilisateur a été supprimé");
            });
        });
    },
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, email, password } = req.body;
            if (!req.user) {
                return next();
            }
            let hashedPassword = "";
            if (password) {
                hashedPassword = yield bcrypt_1.default.hash(password, 10);
            }
            yield dataMapper_1.dataMapper.updateUser(Number(req.user.id), {
                firstname,
                lastname,
                email,
                password: hashedPassword,
            });
            const user = yield dataMapper_1.dataMapper.findUserPerId(Number(req.user.id));
            return res.json({ user: user, message: "Modifications prises en compte" });
        });
    },
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const user = yield dataMapper_1.dataMapper.findUserPerEmail(email);
            if (!user) {
                const error = { message: "Email non reconnu" };
                return next(error);
            }
            const transporter = nodemailer_1.default.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                secure: false,
                auth: {
                    user: process.env.MAILTRAP_USER,
                    pass: process.env.MAILTRAP_PASSWORD,
                },
            });
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET n'est pas défini.");
            }
            const resetToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "2s" });
            function sendResetPasswordEmail(resetToken) {
                return __awaiter(this, void 0, void 0, function* () {
                    const resetLink = `${process.env.REACT_URL}/resetpassword/confirm?token=${resetToken}`;
                    try {
                        yield transporter.sendMail({
                            from: '"SimTracker" <noreply@sim.tracker>',
                            to: user === null || user === void 0 ? void 0 : user.email,
                            subject: "Réinitialisation de votre mot de passe",
                            text: `Bonjour,
    
    Vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe :
    
    ${resetLink}
    
    Si vous n'avez pas demandé cette réinitialisation, ignorez simplement ce message.
    
    Cordialement,
    L'équipe SimTracker`,
                            html: `<p>Bonjour,</p>
                 <p>Vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe :</p>
                 <p><a href="${resetLink}">Réinitialiser mon mot de passe</a></p>
                 <p>Si vous n'avez pas demandé cette réinitialisation, ignorez simplement ce message.</p>
                 <p>Cordialement,<br/>L'équipe SimTracker</p>`,
                        });
                    }
                    catch (error) {
                        console.error("Error sending email:", error);
                    }
                });
            }
            sendResetPasswordEmail(resetToken);
            res.json({ message: "Email envoyé" });
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
            return res.json("ok");
        });
    },
};
//# sourceMappingURL=user.controller.js.map