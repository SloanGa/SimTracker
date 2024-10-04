import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`, // Cela charge automatiquement le bon fichier selon NODE_ENV
});

export const sequelize = new Sequelize(process.env.PG_URL!, {
  dialect: "postgres",
  logging: false,
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
