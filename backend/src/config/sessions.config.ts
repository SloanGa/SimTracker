import dotenv from "dotenv";

dotenv.config();

import app from "../app";

import session from "express-session";
import pgStore from "connect-pg-simple";

const postgresStore = pgStore(session);
const sessionStore = new postgresStore({
  conString: process.env.PG_URL,
  tableName: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
    },
    store: sessionStore,
  }),
);
