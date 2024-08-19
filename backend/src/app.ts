import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";

import router from "./routes/routes";
import "./data/client";

const app = express();
export default app;

import "./config/sessions.config";
import "./config/passport.config";

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
}

app.use(express.json());

app.use(router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(process.env.REACT_APP_FRONTEND_BUILD_PATH || ""));
  console.log(process.env.REACT_APP_FRONTEND_BUILD_PATH);

  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(process.env.REACT_APP_FRONTEND_BUILD_PATH || "");
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
