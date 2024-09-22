import dotenv from "dotenv";
dotenv.config();

import { dataMapper } from "../data/dataMapper";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMailResetPasswordDev } from "../email/resetPasswordDev";
import { sendMailResetPasswordProd } from "../email/resetPasswordProd";
import sanitize from "sanitize-html";

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
    const { firstname, lastname, email, password, simbrief_id } = req.body;
    if (!req.user) {
      return next();
    }

    let hashedPassword = "";
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await dataMapper.updateUser(Number(req.user.id), {
      firstname: sanitize(firstname),
      lastname: sanitize(lastname),
      email: sanitize(email),
      password: hashedPassword,
      simbrief_id: sanitize(simbrief_id),
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
    if (process.env.NODE_ENV === "development") {
      sendMailResetPasswordDev(user);
    } else {
      sendMailResetPasswordProd(user);
    }

    res.json({ message: "Email envoyé. (Verifiez les mails indésirables)" });
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

    return res.json(decoded);
  },

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    const { userId, password } = req.body;

    const user = await dataMapper.findUserPerId(Number(userId));

    if (!user) {
      const error = { message: "Une erreur est survenu. Veuillez réesaeyer." };
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await dataMapper.updateUser(Number(userId), {
      password: hashedPassword,
    });
    res.json({ message: "Modification prise en compte" });
  },
};
