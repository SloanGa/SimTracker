import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { errorHandler, notFound } from "./middlewares/errorHandlers";
import router from "./routes/routes";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const app = express();
export default app;

import "./config/sessions.config";
import "./config/passport.config";
import "./database/client";

app.use(
  cors({
    origin: process.env.REACT_URL!,
    credentials: true,
  }),
);

app.use(express.json());

app.use(router);

app.get("/", (_req: Request, res: Response) => {
  res.send("API SimTracker");
});

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
