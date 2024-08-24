import dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`, // Cela charge automatiquement le bon fichier selon NODE_ENV
});

import { Client } from "pg";

const client = new Client(process.env.PG_URL);

// const client = new Client({
//   host: process.env.HOST_DB,
//   database: process.env.NAME_DB,
//   user: process.env.USER_DB,
//   password: process.env.PASSWORD_DB,
//   port: 5432,
//   ssl: true,
// });

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database Simtracker");
  }
});

export default client;
