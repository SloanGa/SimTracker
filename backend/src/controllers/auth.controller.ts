import { NextFunction, Request, Response } from "express";
import { dataMapper } from "../data/dataMapper";
import bcrypt from "bcrypt";
import passport from "passport";

export const authController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    const { firstname, lastname, email, password } = req.body;
    const users = await dataMapper.findAllUsers();

    if (users.some((user) => user.email === email)) {
      const error = { message: "Email non disponible" };
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await dataMapper.userCreate(firstname, lastname, email, hashedPassword);
    await dataMapper.createFlightLogId(email);
    const newUser = await dataMapper.findUserPerEmail(email);

    if (newUser) {
      req.login(newUser, (error) => {
        if (error) {
          next(error);
        } else {
          res.status(201).json({ message: "User created" });
        }
      });
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", (err: any, user: Express.User, info: { message: string }) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ message: "Logged in" });
      });
    })(req, res, next);
  },

  isAuthenticated(req: Request, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.json({ message: "User authenticated" });
  },

  async logout(req: Request, res: Response) {
    try {
      req.logout(() => {
        res.status(200).json({ message: "Logged out" });
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred" });
    }
  },
};
