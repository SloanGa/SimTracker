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
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.query("SELECT id,firstname,lastname,email,picture_url FROM users");
            return result.rows;
        });
    },
    findUserPerEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.query("SELECT * FROM users WHERE email = $1", [email]);
            return result.rows[0];
        });
    },
    findUserPerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.query("SELECT id,firstname,lastname,email,picture_url FROM users WHERE id = $1", [id]);
            return result.rows[0];
        });
    },
    userCreate(firstname, lastname, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_1.default.query("INSERT INTO users (firstname,lastname,email,password) VALUES ($1,$2,$3,$4)", [firstname, lastname, email, password]);
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_1.default.query("DELETE FROM users WHERE id = $1", [id]);
        });
    },
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, email, password } = data;
            const updates = [];
            const values = [];
            if (firstname && firstname !== "") {
                updates.push(`firstname = $${updates.length + 1}`);
                values.push(firstname);
            }
            if (lastname && lastname !== "") {
                updates.push(`lastname = $${updates.length + 1}`);
                values.push(lastname);
            }
            if (email && email !== "") {
                updates.push(`email = $${updates.length + 1}`);
                values.push(email);
            }
            if (password && password !== "") {
                updates.push(`password = $${updates.length + 1}`);
                values.push(password);
            }
            if (updates.length === 0) {
                throw new Error("Aucune donnée à mettre à jour");
            }
            values.push(id);
            yield client_1.default.query(`
      UPDATE users
      SET ${updates.join(", ")}
      WHERE id = $${updates.length + 1}
    `, values);
        });
    },
    createFlightLogId(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_1.default.query("INSERT INTO flight_log (user_id) VALUES ((SELECT id FROM users WHERE email = $1))", [email]);
        });
    },
    getFlightData(id, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.query(`SELECT flc.* FROM flight_log_content AS flc JOIN flight_log AS fl ON flc.flight_log_id = fl.id WHERE fl.user_id = $1 ORDER BY flc.id DESC LIMIT 10 OFFSET $2;`, [id, offset]);
            return result.rows;
        });
    },
    getAllFlightData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.query(`SELECT flc.* 
       FROM flight_log_content AS flc 
       JOIN flight_log AS fl 
       ON flc.flight_log_id = fl.id 
       WHERE fl.user_id = $1`, [id]);
            return result.rows;
        });
    },
    addFlightData(email, date, flight_number, departure, arrival, flight_time, aircraft_name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_1.default.query(`INSERT INTO flight_log_content (flight_log_id, date, flight_number, departure, arrival, flight_time, aircraft_name)
       VALUES (
         (SELECT fl.id FROM flight_log AS fl
          JOIN users AS u ON fl.user_id = u.id
          WHERE u.email = $1),
         $2, $3, $4, $5, $6, $7)`, [email, date, flight_number, departure, arrival, flight_time, aircraft_name]);
        });
    },
    deleteFlightData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_1.default.query(`DELETE FROM flight_log_content WHERE id=$1 `, [id]);
        });
    },
};
//# sourceMappingURL=dataMapper.js.map