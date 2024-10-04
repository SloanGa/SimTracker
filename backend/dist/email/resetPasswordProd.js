"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailResetPasswordProd = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config({
    path: `.env.${process.env.NODE_ENV}`,
});
const sendMailResetPasswordProd = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET n'est pas défini.");
    }
    const resetToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "30m" });
    const resetLink = `${process.env.REACT_URL}/resetpassword/confirm?token=${resetToken}`;
    mail_1.default.setApiKey(process.env.SENDGRID_API_KEY || "");
    const msg = {
        to: user === null || user === void 0 ? void 0 : user.email,
        from: process.env.VERIFIED_EMAIL || "",
        subject: "Réinitialisation de votre mot de passe",
        text: `Bonjour,
      
      Vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe :
      
      ${resetLink}
    
      Ce lien a une validité limitée.
      
      Si vous n'avez pas demandé cette réinitialisation, ignorez simplement ce message.
      
      Cordialement,
      L'équipe SimTracker`,
        html: `<p>Bonjour,</p>
      <p>Vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe :</p>
      <p><a href="${resetLink}">Réinitialiser mon mot de passe</a></p>
      <p>Ce lien a une validité limitée.</p>
      <p>Si vous n'avez pas demandé cette réinitialisation, ignorez simplement ce message.</p>
      <p>Cordialement,<br/>L'équipe SimTracker</p>`,
    };
    mail_1.default
        .send(msg)
        .then(() => {
        console.log("Email sent");
    })
        .catch((error) => {
        console.log(error);
    });
};
exports.sendMailResetPasswordProd = sendMailResetPasswordProd;
//# sourceMappingURL=resetPasswordProd.js.map