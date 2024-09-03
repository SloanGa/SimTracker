import { dataMapper } from "../data/dataMapper";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

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
          res.status(200).json("L'utilisateur a été supprimé");
          return;
        });
      }
    } catch {
      res.status(500).json({ message: "Une erreur est survenue" });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const { firstname, lastname, email, password, confirm } = req.body;
      if (req.user) {
        if (
          email &&
          email.match(
            // eslint-disable-next-line no-useless-escape
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
          ) === null
        ) {
          res.status(400).json({ message: "Veuillez entrer un email valide : exemple@exemple.fr" });
          return;
        }

        if (password && password !== confirm) {
          res.status(400).json({ message: "Les mots de passe ne sont pas identiques" });
          return;
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
        res.status(200).json({ user: user, message: "Modifications prises en compte" });
      }
    } catch {
      res.status(500).json({ message: "Une erreur est survenue" });
    }
  },

  async resetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await dataMapper.findUserPerEmail(email);

      if (!user) {
        res.status(400).json({ message: "Email non reconnu" });
        return;
      }

      if (
        email &&
        email.match(
          // eslint-disable-next-line no-useless-escape
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        ) === null
      ) {
        res.status(400).json({ message: "Veuillez entrer un email valide : exemple@exemple.fr" });
        return;
      }

      // envoyer le mail ici
      res.status(200).json({ message: "Email envoyé" });
    } catch {
      res.status(500).json({ message: "Une erreur est survenue" });
    }
  },
};
