import { FlightLogContent } from "../interfaces/FlightLogContent";
import { User } from "../interfaces/User";
import client from "./client";

export const dataMapper = {
  async findAllUsers() {
    const result = await client.query("SELECT * FROM users");
    return result.rows;
  },

  /**
   * Retrieves user details based on their email address.
   *
   * This function queries the `users` table to find and return the user record where the email matches the provided value.
   */
  async findUserPerEmail(email: string): Promise<User | undefined> {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  },

  /**
   * Retrieves user details based on their id.
   *
   * This function queries the `users` table to find and return the user record where the id matches the provided value.
   */
  async findUserPerId(id: number): Promise<User | undefined> {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  /**
   * Creates a new user in the database with the provided details.
   *
   * This function inserts a new user into the `users` table and returns the newly created user record.
   */
  async userCreate(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<void> {
    await client.query(
      "INSERT INTO users (firstname,lastname,email,password) VALUES ($1,$2,$3,$4)",
      [firstname, lastname, email, password]
    );
  },

  /**
   * Deletes a user from the database by their ID.
   *
   * This function removes a user from the `users` table based on the provided user ID.
   */
  async deleteUser(id: number): Promise<void> {
    await client.query("DELETE FROM users WHERE id = $1", [id]);
  },

  async updateUser(
    id: number,
    data: { firstname?: string; lastname?: string; email?: string; password?: string }
  ): Promise<void> {
    const { firstname, lastname, email, password } = data;

    // Créer un tableau pour les parties SET et les valeurs associées
    const updates = [];
    const values = [];

    if (firstname && firstname !== "") {
      updates.push(`firstname = $${updates.length + 1}`);
      values.push(firstname);
    }

    if (lastname && lastname !== "") {
      updates.push(`lastname = $${updates.length + 1}`);
      values.push(lastname);
    }

    if (email && email !== "") {
      updates.push(`email = $${updates.length + 1}`);
      values.push(email);
    }
    if (password && password !== "") {
      updates.push(`password = $${updates.length + 1}`);
      values.push(password);
    }

    if (updates.length === 0) {
      throw new Error("Aucune donnée à mettre à jour");
    }

    values.push(id);

    // Exécuter la requête
    await client.query(
      `
      UPDATE users
      SET ${updates.join(", ")}
      WHERE id = $${updates.length + 1}
    `,
      values
    );
  },

  /**
   * Creates a new flight log entry for the user with the specified email.
   *
   * This function inserts a record into the flight_log table using the user's ID on signup.,
   */
  async createFlightLogId(email: string): Promise<void> {
    await client.query(
      "INSERT INTO flight_log (user_id) VALUES ((SELECT id FROM users WHERE email = $1))",
      [email]
    );
  },

  /**
   * Retrieves flight log content for a user based on their id.
   *
   * This function joins the `flight_log_content` and `flight_log` tables to fetch records where the `user_id` matches the user associated with the provided id.
   */
  async getFlightData(id: number, offset: number): Promise<FlightLogContent[]> {
    const result = await client.query(
      `SELECT flc.* FROM flight_log_content AS flc JOIN flight_log AS fl ON flc.flight_log_id = fl.id WHERE fl.user_id = $1 ORDER BY flc.id DESC LIMIT 10 OFFSET $2;`,
      [id, offset]
    );
    return result.rows;
  },

  async getAllFlightData(id: number): Promise<FlightLogContent[]> {
    const result = await client.query(
      `SELECT flc.* 
       FROM flight_log_content AS flc 
       JOIN flight_log AS fl 
       ON flc.flight_log_id = fl.id 
       WHERE fl.user_id = $1`,
      [id]
    );
    return result.rows;
  },

  /**
   * Adds flight data for a user based on their email.
   *
   * This function inserts a new record into the `flight_log_content` table. It first retrieves the `flight_log_id` by joining the `flight_log` and `users` tables using the provided email. The retrieved `flight_log_id` is then used to insert the flight data.
   */
  async addFlightData(
    email: string,
    date: Date,
    flight_number: string,
    departure: string,
    arrival: string,
    flight_time: number,
    aircraft_name: string
  ): Promise<void> {
    await client.query(
      `INSERT INTO flight_log_content (flight_log_id, date, flight_number, departure, arrival, flight_time, aircraft_name)
       VALUES (
         (SELECT fl.id FROM flight_log AS fl
          JOIN users AS u ON fl.user_id = u.id
          WHERE u.email = $1),
         $2, $3, $4, $5, $6, $7)`,
      [email, date, flight_number, departure, arrival, flight_time, aircraft_name]
    );
  },

  async deleteFlightData(id: number): Promise<void> {
    await client.query(`DELETE FROM flight_log_content WHERE id=$1 `, [id]);
  },
};
