import dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";

const client = new Client(process.env.PG_URL);

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database Simtracker");
  }
});
