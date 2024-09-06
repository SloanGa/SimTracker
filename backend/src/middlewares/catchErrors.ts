import { NextFunction, Request, Response } from "express";

export const catchErrors = (
  controller: (req: Request, res: Response, next: NextFunction) => Promise<any> | undefined
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
