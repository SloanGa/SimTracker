import dotenv from "dotenv";
import express from "express";
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
    origin: [process.env.REACT_URL!, "http://localhost:4173", "http://localhost:5173"],
    credentials: true,
  }),
);

console.log("REACT_URL:", process.env.REACT_URL);

app.use(express.json());

app.use(router);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
