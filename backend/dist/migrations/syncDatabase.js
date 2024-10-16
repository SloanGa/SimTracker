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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: `.env.${process.env.NODE_ENV}`,
});
const associations_1 = require("../models/associations");
function syncDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield associations_1.Users.sync();
            yield associations_1.FlightLogContent.sync();
            yield associations_1.Sessions.sync();
            console.log("Tables created");
        }
        catch (err) {
            console.log("Error syncing the database:", err);
        }
    });
}
syncDatabase()
    .then(() => {
    process.exit(0);
})
    .catch((err) => {
    console.error("Error during database synchronization:", err);
    process.exit(1);
});
//# sourceMappingURL=syncDatabase.js.map