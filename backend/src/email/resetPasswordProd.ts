import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/User";
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const sendMailResetPasswordProd = (user: User): void | any => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET n'est pas défini.");
  }

  const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "30m" });

  const resetLink = `${process.env.REACT_URL}/resetpassword/confirm?token=${resetToken}`;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  const msg = {
    to: user?.email,
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
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.log(error);
    });
};
