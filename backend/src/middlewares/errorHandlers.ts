import { NextFunction, Request, Response } from "express";

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  const error: any = new Error("Not Found");

  error.statusCode = 404;

  next(error);
};

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ error: err.message });
};
