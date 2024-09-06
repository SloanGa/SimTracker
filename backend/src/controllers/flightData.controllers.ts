import { dataMapper } from "../data/dataMapper";
import { Request, Response } from "express";

export const flightDataControllers = {
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
        const currentPage = req.query.currentPage || 1;
        const offset = (Number(currentPage) - 1) * 10;
        const flightData = await dataMapper.getFlightData(req.user.id, offset);

        res.status(200).json(flightData);
      } catch {
        res.status(500).json({ message: "Une erreur est survenue" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  },

  async getAllFlightData(req: Request, res: Response) {
    if (req.user) {
      try {
        const flightData = await dataMapper.getAllFlightData(req.user.id);

        res.status(200).json(flightData);
      } catch {
        res.status(500).json({ message: "Une erreur est survenue" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  },

  async postFlightData(req: Request, res: Response) {
    if (req.user) {
      try {
        const email = req.user.email;
        const { date, flight_number, departure, arrival, flight_time, aircraft } = req.body;

        if (isNaN(flight_time) || flight_time <= 0) {
          res.status(400).json({ message: "Veuillez saisir un nombre en minutes" });
          return;
        }

        if (!date) {
          res.status(400).json({ message: "Veuillez saisir un vol valide" });
          return;
        }

        if (arrival.length !== 4 || departure.length !== 4) {
          res
            .status(400)
            .json({ message: "Veuillez saisir un aéroport au format ICAO (4 caractères)" });
          return;
        }

        await dataMapper.addFlightData(
          email,
          date,
          flight_number,
          departure,
          arrival,
          flight_time,
          aircraft
        );
        res.status(200).json({ message: "Vol ajouté avec succés" });
      } catch (e) {
        res.status(500).json({ message: "Une erreur est survenue" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  },

  async deleteFlight(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await dataMapper.deleteFlightData(id);
      res.status(200).json("Flight data has deleted");
    } catch (e) {
      res
        .status(500)
        .json({ message: "Une erreur est survenue lors de la suppression. Veuillez réesayer" });
    }
  },
};
