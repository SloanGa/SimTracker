import client from "./client";

export const dataMapper = {
  async findUserPerEmail(email: string) {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  },

  async findUserPerId(id: number) {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  async userCreate(firstname: string, lastname: string, email: string, password: string) {
    await client.query(
      "INSERT INTO users (firstname,lastname,email,password) VALUES ($1,$2,$3,$4) RETURNING *",
      [firstname, lastname, email, password]
    );
  },

  async createFlightLogId(email: string) {
    await client.query(
      "INSERT INTO flight_log (user_id) VALUES ((SELECT id FROM users WHERE email = $1))",
      [email]
    );
  },
};
