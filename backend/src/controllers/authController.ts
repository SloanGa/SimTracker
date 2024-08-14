import { Request, Response } from "express";
import { dataMapper } from "../data/dataMapper";
import { log } from "console";

export const authController = {
  async signup(req: Request, res: Response) {
    try {
      const { firstname, lastname, email, password } = req.body;
      await dataMapper.userCreate(firstname, lastname, email, password);

      res.status(201).json({ message: "User created" });
    } catch (error) {
      log(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
};
