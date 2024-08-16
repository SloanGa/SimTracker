import { dataMapper } from "../data/dataMapper";
import { Request, Response } from "express";

export const apiControllers = {
  /**
   * Retrieves flight data for the authenticated user and sends it to the client.
   *
   * This function checks if the user is authenticated. If so, it fetches the flight data
   * associated with the user's email and responds with this data in JSON format. If an error occurs,
   * it responds with a 500 status code and an error message. If the user is not authenticated,
   * it responds with a 401 status code and an unauthorized message.
   */
  async getFlightData(req: Request, res: Response) {
    if (req.user) {
      try {
        const flightData = await dataMapper.getFlightData(req.user.id);
        res.status(200).json(flightData);
      } catch {
        res.status(500).json({ message: "Une erreur est survenue" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  },
};
