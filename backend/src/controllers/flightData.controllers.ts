import { NextFunction, Request, Response } from "express";
import sanitize from "sanitize-html";
import { FlightLogContent } from "../models/FlightLogContent";

export const flightDataControllers = {
  async getFlightData(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return next();
    }
    const currentPage = req.query.currentPage || 1;
    const limit = 10;
    const offset = (Number(currentPage) - 1) * 10;
    const flightData = await FlightLogContent.findAll({
      where: {
        user_id: req.user.id,
      },
      limit: limit,
      offset: offset,
    });

    return res.json(flightData);
  },

  async getAllFlightData(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return next();
    }
    const flightData = await FlightLogContent.findAll({
      where: {
        user_id: req.user.id,
      },
    });

    return res.json(flightData);
  },

  async postFlightData(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return next();
    }
    const { date, flight_number, departure, arrival, flight_time, aircraft } = req.body;

    await FlightLogContent.create({
      date: date,
      flight_number: sanitize(flight_number),
      departure: sanitize(departure),
      arrival: sanitize(arrival),
      flight_time: flight_time,
      aircraft: sanitize(aircraft),
    });

    res.json({ message: "Vol ajouté avec sucées" });
  },

  async deleteFlight(req: Request, res: Response) {
    const id = Number(req.params.id);

    await FlightLogContent.destroy({
      where: { id: id },
    });
    res.json("Flight data has deleted");
  },
};
