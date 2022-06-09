import express from "express";
import worldLocations from "../helpers/worldLocations.js";
import "./worldLocationsDoc.js";

const locationsRouter = express.Router();
const LOCATIONS_ROUTE = "/locations";

/**
 * @swagger
 * tags:
 *   name: World Locations
 *   description: World Locations related endpoints.
 */

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get all locations
 *     tags: [World Locations]
 *     description: Get all locations
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorldLocation'
 */
locationsRouter.get("/", (req, res) => {
  res.json(worldLocations);
});

export { locationsRouter, LOCATIONS_ROUTE };
