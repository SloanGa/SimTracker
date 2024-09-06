import { dataMapper } from "../data/dataMapper";
import { NextFunction, Request, Response } from "express";

export const flightDataControllers = {
  async getFlightData(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return next();
    }
    const currentPage = req.query.currentPage || 1;
    const offset = (Number(currentPage) - 1) * 10;
    const flightData = await dataMapper.getFlightData(req.user.id, offset);

    return res.json(flightData);
  },

  async getAllFlightData(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return next();
    }
    const flightData = await dataMapper.getAllFlightData(req.user.id);

    return res.json(flightData);
  },

  async postFlightData(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return next();
    }
    const email = req.user.email;
    const { date, flight_number, departure, arrival, flight_time, aircraft } = req.body;

    await dataMapper.addFlightData(
      email,
      date,
      flight_number,
      departure,
      arrival,
      flight_time,
      aircraft
    );
    res.json({ message: "Vol ajouté avec succés" });
  },

  async deleteFlight(req: Request, res: Response) {
    const id = Number(req.params.id);

    await dataMapper.deleteFlightData(id);
    res.json("Flight data has deleted");
  },
};
