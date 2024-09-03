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
const dataMapper_1 = require("../data/dataMapper");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userController = {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.user) {
                    const user = yield dataMapper_1.dataMapper.findUserPerEmail(req.user.email);
                    if (user) {
                        res.status(200).json(user);
                    }
                }
                else {
                    res.status(401).json({ message: "Utilisateur non authentifié" });
                }
            }
            catch (_a) {
                res.status(500).json({ message: "Une erreur est survenue" });
            }
        });
    },
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.user) {
                    yield dataMapper_1.dataMapper.deleteUser(Number(req.user.id));
                    req.logout(() => {
                        res.status(200).json("L'utilisateur a été supprimé");
                        return;
                    });
                }
            }
            catch (_a) {
                res.status(500).json({ message: "Une erreur est survenue" });
            }
        });
    },
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstname, lastname, email, password, confirm } = req.body;
                if (req.user) {
                    if (email &&
                        email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null) {
                        res.status(400).json({ message: "Veuillez entrer un email valide : exemple@exemple.fr" });
                        return;
                    }
                    if (password && password !== confirm) {
                        res.status(400).json({ message: "Les mots de passe ne sont pas identiques" });
                        return;
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
                    res.status(200).json({ user: user, message: "Modifications prises en compte" });
                }
            }
            catch (_a) {
                res.status(500).json({ message: "Une erreur est survenue" });
            }
        });
    },
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield dataMapper_1.dataMapper.findUserPerEmail(email);
                if (!user) {
                    res.status(400).json({ message: "Email non reconnu" });
                    return;
                }
                if (email &&
                    email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null) {
                    res.status(400).json({ message: "Veuillez entrer un email valide : exemple@exemple.fr" });
                    return;
                }
                res.status(200).json({ message: "Email envoyé" });
            }
            catch (_a) {
                res.status(500).json({ message: "Une erreur est survenue" });
            }
        });
    },
};
//# sourceMappingURL=user.controller.js.map