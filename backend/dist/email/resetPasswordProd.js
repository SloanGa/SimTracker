"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailResetPasswordProd = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: `.env.${process.env.NODE_ENV}`,
});
const sendMailResetPasswordProd = () => {
    mail_1.default.setApiKey(process.env.SENDGRID_API_KEY || "");
    console.log("API Key:", process.env.SENDGRID_API_KEY);
    const msg = {
        to: "sloangauthier@gmail.com",
        from: "sloangauthier@icloud.com",
        subject: "Sending with SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    mail_1.default
        .send(msg)
        .then(() => {
        console.log("Email sent");
    })
        .catch((error) => {
        console.error(error);
    });
};
exports.sendMailResetPasswordProd = sendMailResetPasswordProd;
//# sourceMappingURL=resetPasswordProd.js.map