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
exports.sendMailResetPassword = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendMailResetPassword = (user) => {
    const transporter = nodemailer_1.default.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD,
        },
    });
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET n'est pas défini.");
    }
    const resetToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "30m" });
    function sendResetPasswordEmail(resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const resetLink = `${process.env.REACT_URL}/resetpassword/confirm?token=${resetToken}`;
            try {
                yield transporter.sendMail({
                    from: '"SimTracker" <noreply@sim.tracker>',
                    to: user === null || user === void 0 ? void 0 : user.email,
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
                });
            }
            catch (error) {
                console.error("Error sending email:", error);
            }
        });
    }
    sendResetPasswordEmail(resetToken);
};
exports.sendMailResetPassword = sendMailResetPassword;
//# sourceMappingURL=resetPassword.js.map