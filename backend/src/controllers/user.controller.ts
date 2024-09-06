import { dataMapper } from "../data/dataMapper";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

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
    // envoyer le mail ici
    res.json({ message: "Email envoyé" });
  },
};
