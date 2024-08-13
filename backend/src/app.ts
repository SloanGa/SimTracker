import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import { join } from "path";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "../frontend/build")));

  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(join(__dirname, "../frontend/build", "index.html"));
  });
}

app.get("/api/data", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.json({ message: "Hello from the backend!" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
