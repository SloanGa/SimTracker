import dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

import express from "express";
import cors from "cors";
import { errorHandler, notFound } from "./middlewares/errorHandlers";

import router from "./routes/routes";
import "./data/client";

const app = express();
export default app;

import "./config/sessions.config";
import "./config/passport.config";

app.use(
  cors({
    origin: process.env.REACT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(router);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
