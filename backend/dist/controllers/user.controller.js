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