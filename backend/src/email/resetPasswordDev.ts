import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/User";

export const sendMailResetPassword = (user: User) => {
  const transporter = nodemailer.createTransport({
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

  const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "30m" });

  async function sendResetPasswordEmail(resetToken: string) {
    const resetLink = `${process.env.REACT_URL}/resetpassword/confirm?token=${resetToken}`;

    try {
      await transporter.sendMail({
        from: '"SimTracker" <noreply@sim.tracker>', // Adresse de l'expéditeur
        to: user?.email, // Liste des destinataires
        subject: "Réinitialisation de votre mot de passe", // Ligne de sujet
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
                   <p>Cordialement,<br/>L'équipe SimTracker</p>`, // Corps du texte en HTML
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
  sendResetPasswordEmail(resetToken);
};
