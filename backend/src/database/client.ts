import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`, // Cela charge automatiquement le bon fichier selon NODE_ENV
});

if (!process.env.PG_URL) {
  throw new Error("PG_URL environment variable is not set!");
}

export const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions:
    process.env.NODE_ENV === "production"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error); // Affiche l'erreur pour plus de détails
  });
