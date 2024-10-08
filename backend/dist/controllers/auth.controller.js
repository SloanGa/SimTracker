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
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const associations_1 = require("../models/associations");
exports.authController = {
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, email, password, simbrief_id } = req.body;
            const users = yield associations_1.Users.findAll();
            if (users.some((user) => user.email === email)) {
                const error = { message: "Email non disponible" };
                return next(error);
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield associations_1.Users.create({
                firstname: (0, sanitize_html_1.default)(firstname),
                lastname: (0, sanitize_html_1.default)(lastname),
                email: (0, sanitize_html_1.default)(email),
                password: hashedPassword,
                simbrief_id,
            });
            if (newUser) {
                req.login(newUser, (error) => {
                    if (error) {
                        next(error);
                    }
                    else {
                        res.status(201).json({ message: "User created" });
                    }
                });
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
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return res.json({ message: "User authenticated" });
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