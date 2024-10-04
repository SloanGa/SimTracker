import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

import { Users, FlightLogContent } from "../models/associations";

async function syncDatabase() {
  try {
    await Users.sync({ force: true });
    await FlightLogContent.sync({ force: true });
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
