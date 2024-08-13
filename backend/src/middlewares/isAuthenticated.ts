import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  //Verifier si l'utilisateur est authentifié avec req.session plus tard
  if (req) {
    return next(); // L'utilisateur est authentifié, on passe à la suite
  } else {
    return res.status(401).json({ message: "Unauthorized" }); // Utilisateur non authentifié
  }
};
