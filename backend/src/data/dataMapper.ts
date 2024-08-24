import { FlightLogContent } from "../interfaces/FlightLogContent";
import { User } from "../interfaces/User";
import client from "./client";

export const dataMapper = {
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
