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
const app_1 = __importDefault(require("../app"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = require("../models/Users");
app_1.default.use(passport_1.default.initialize());
app_1.default.use(passport_1.default.session());
passport_1.default.use("local", new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.Users.findOne({ where: { email: email } });
    if (user) {
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (match) {
            done(null, user);
        }
        else {
            done(null, false, { message: "Email ou mot de passe incorrect" });
        }
    }
    else {
        done(null, false, { message: "Email ou mot de passe incorrect" });
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_1.Users.findByPk(id);
        done(null, user);
    }
    catch (err) {
        done(err, null);
    }
}));
//# sourceMappingURL=passport.config.js.map