import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

import { Users, FlightLogContent, Sessions } from "../models/associations";

async function syncDatabase() {
  try {
    await Users.sync();
    await FlightLogContent.sync();
    await Sessions.sync();
    console.log("Tables created");
  } catch (err) {
    console.log("Error syncing the database:", err);
  }
}

syncDatabase()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error during database synchronization:", err);
    process.exit(1);
  });
