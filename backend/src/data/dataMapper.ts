import client from "./client";

export const dataMapper = {
  async userCreate(firstname: string, lastname: string, email: string, password: string) {
    try {
      await client.query(
        "INSERT INTO users (firstname,lastname,email,password) VALUES ($1,$2,$3,$4) RETURNING *",
        [firstname, lastname, email, password]
      );
    } catch (error) {
      throw error;
    }
  },
};
