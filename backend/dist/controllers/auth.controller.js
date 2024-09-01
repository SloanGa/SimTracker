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
exports.authController = void 0;
const dataMapper_1 = require("../data/dataMapper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
exports.authController = {
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstname, lastname, email, password } = req.body;
                const users = yield dataMapper_1.dataMapper.findAllUsers();
                if (users.filter((user) => user.email === email)) {
                    res.status(400).json({ message: "Email non disponible" });
                    return;
                }
                if (!firstname || !lastname || !email || !password) {
                    res.status(400).json({ message: "Veuillez remplir tous les champs" });
                    return;
                }
                if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null) {
                    res.status(400).json({ message: "Veuillez entrer un email valide : exemple@exemple.fr" });
                    return;
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                yield dataMapper_1.dataMapper.userCreate(firstname, lastname, email, hashedPassword);
                yield dataMapper_1.dataMapper.createFlightLogId(email);
                const newUser = yield dataMapper_1.dataMapper.findUserPerEmail(email);
                if (newUser) {
                    req.login(newUser, (err) => {
                        if (err) {
                            next(err);
                        }
                        else {
                            res.status(201).json({ message: "User created" });
                        }
                    });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Une erreur est survenue" });
            }
        });
    },
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate("local", (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(401).json({ message: info.message });
                }
                req.login(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json({ message: "Logged in" });
                });
            })(req, res, next);
        });
    },
    isAuthenticated(req, res) {
        if (req.user) {
            return res.status(200).json({ message: "User authenticated" });
        }
        else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    },
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.logout(() => {
                    res.status(200).json({ message: "Logged out" });
                });
            }
            catch (error) {
                res.status(500).json({ message: "An error occurred" });
            }
        });
    },
};
//# sourceMappingURL=auth.controller.js.map