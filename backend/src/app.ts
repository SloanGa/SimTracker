import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { errorHandler, notFound } from "./middlewares/errorHandlers";

import router from "./routes/routes";
import "./database/client";
import "./config/sessions.config";
import "./config/passport.config";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const app = express();
export default app;

app.use(
  cors({
    origin: process.env.REACT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(router);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
