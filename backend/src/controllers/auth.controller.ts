import { Request, Response } from "express";
import { dataMapper } from "../data/dataMapper";
import bcrypt from "bcrypt";

export const authController = {
  async signup(req: Request, res: Response) {
    try {
      const { firstname, lastname, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);

      await dataMapper.userCreate(firstname, lastname, email, hashedPassword);

      res.status(201).json({ message: "User created" });
    } catch (error) {
      res.status(500).json({ message: "An error occurred" });
    }
  },
};
