import { dataMapper } from "../data/dataMapper";
import { Request, Response } from "express";

export const userController = {
  async getUser(req: Request, res: Response) {
    try {
      if (req.user) {
        const user = await dataMapper.findUserPerEmail(req.user.email);
        if (user) {
          res.status(200).json(user);
        }
      } else {
        res.status(401).json({ message: "Utilisateur non authentifié" });
      }
    } catch {
      res.status(500).json({ message: "Une erreur est survenue" });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      if (req.user) {
        await dataMapper.deleteUser(Number(req.user.id));
        req.logout(() => {
          res.status(200).json("User has deleted");
          return;
        });
      }
    } catch {
      res.status(500).json({ message: "Une erreur est survenue" });
    }
  },
};
