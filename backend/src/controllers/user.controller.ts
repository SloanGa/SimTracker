import dotenv from "dotenv";
dotenv.config();

import { dataMapper } from "../data/dataMapper";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const userController = {
  async all(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return next();
    }
    const users = await dataMapper.findAllUsers();

    return res.json(users);
  },

  async getUser(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return next();
    }
    const user = await dataMapper.findUserPerId(req.user.id);
    if (!user) {
      return next();
    }
    return res.json(user);
  },

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return next();
    }
    await dataMapper.deleteUser(Number(req.user.id));
    req.logout(() => {
      return res.status(204).json("L'utilisateur a été supprimé");
    });
  },

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { firstname, lastname, email, password } = req.body;
    if (!req.user) {
      return next();
    }

    let hashedPassword = "";
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await dataMapper.updateUser(Number(req.user.id), {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    const user = await dataMapper.findUserPerId(Number(req.user.id));
    return res.json({ user: user, message: "Modifications prises en compte" });
  },

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const user = await dataMapper.findUserPerEmail(email);

    if (!user) {
      const error = { message: "Email non reconnu" };
      return next(error);
    }

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

    const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "2s" });

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
    
    Si vous n'avez pas demandé cette réinitialisation, ignorez simplement ce message.
    
    Cordialement,
    L'équipe SimTracker`, // Corps du texte en clair
          html: `<p>Bonjour,</p>
                 <p>Vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe :</p>
                 <p><a href="${resetLink}">Réinitialiser mon mot de passe</a></p>
                 <p>Si vous n'avez pas demandé cette réinitialisation, ignorez simplement ce message.</p>
                 <p>Cordialement,<br/>L'équipe SimTracker</p>`, // Corps du texte en HTML
        });
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }

    sendResetPasswordEmail(resetToken);

    res.json({ message: "Email envoyé" });
  },

  async resetPasswordConfirm(req: Request, res: Response, next: NextFunction) {
    const token = req.query.token as string;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      const error = { message: "Ce lien est expiré" };
      return next(error);
    }
    return res.json("ok");
  },
};
