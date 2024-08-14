import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import router from "./routes/routes";
import "./data/client";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(router);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
