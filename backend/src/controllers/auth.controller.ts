import { NextFunction, Request, Response } from "express";
import { dataMapper } from "../data/dataMapper";
import bcrypt from "bcrypt";
import passport from "passport";

export const authController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstname, lastname, email, password } = req.body;

      if (!firstname || !lastname || !email || !password) {
        res.status(400).json({ message: "Veuillez remplir tous les champs" });
        return;
      }

      if (
        email.match(
          // eslint-disable-next-line no-useless-escape
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        ) === null
      ) {
        res.status(400).json({ message: "Veuillez entrer un email valide : exemple@exemple.fr" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await dataMapper.userCreate(firstname, lastname, email, hashedPassword);
      await dataMapper.createFlightLogId(email);
      const newUser = await dataMapper.findUserPerEmail(email);

      if (newUser) {
        req.login(newUser, (err) => {
          if (err) {
            next(err);
          } else {
            res.status(201).json({ message: "User created" });
          }
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Une erreur est survenue" });
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
    if (req.user) {
      return res.status(200).json({ message: "User authenticated" });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
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
