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
const console_1 = require("console");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.authController = {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstname, lastname, email, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                console.log(hashedPassword);
                yield dataMapper_1.dataMapper.userCreate(firstname, lastname, email, hashedPassword);
                res.status(201).json({ message: "User created" });
            }
            catch (error) {
                (0, console_1.log)(error);
                res.status(500).json({ message: "An error occurred" });
            }
        });
    },
};
//# sourceMappingURL=auth.controller.js.map