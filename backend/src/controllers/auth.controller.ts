import { NextFunction, Request, Response } from "express";
import { dataMapper } from "../data/dataMapper";
import bcrypt from "bcrypt";

export const authController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstname, lastname, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);

      await dataMapper.userCreate(firstname, lastname, email, hashedPassword);

      const newUser = await dataMapper.findUserPerEmail(email);

      req.login(newUser, (err) => {
        if (err) {
          next(err);
        } else {
          res.status(201).json({ message: "User created" });
        }
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred" });
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
