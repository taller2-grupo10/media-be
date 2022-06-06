import express from "express";
import worldLocations from "../helpers/worldLocations.js";

const locationsRouter = express.Router();
const LOCATIONS_ROUTE = "/locations";

locationsRouter.get("/", (req, res) => {
  res.json(worldLocations);
});

export { locationsRouter, LOCATIONS_ROUTE };
