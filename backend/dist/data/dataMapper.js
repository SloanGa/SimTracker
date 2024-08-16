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
exports.dataMapper = void 0;
const client_1 = __importDefault(require("./client"));
exports.dataMapper = {
    findUserPerEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.query("SELECT * FROM users WHERE email = $1", [email]);
            return result.rows[0];
        });
    },
    findUserPerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.query("SELECT * FROM users WHERE id = $1", [id]);
            return result.rows[0];
        });
    },
    userCreate(firstname, lastname, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_1.default.query("INSERT INTO users (firstname,lastname,email,password) VALUES ($1,$2,$3,$4) RETURNING *", [firstname, lastname, email, password]);
        });
    },
    createFlightLogId(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_1.default.query("INSERT INTO flight_log (user_id) VALUES ((SELECT id FROM users WHERE email = $1))", [email]);
        });
    },
    getFlightData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.query("SELECT flc.* FROM flight_log_content AS flc JOIN flight_log AS fl ON flc.flight_log_id = fl.id WHERE fl.user_id = $1;", [id]);
            return result.rows;
        });
    },
};
//# sourceMappingURL=dataMapper.js.map