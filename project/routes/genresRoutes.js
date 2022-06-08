import express from "express";
import musicGenres from "../helpers/musicGenres.js";
import "./genresRoutesDoc.js";

const genresRouter = express.Router();
const GENRES_ROUTE = "/genres";

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: Genres related endpoints.
 */

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Get all genres
 *     tags: [Genres]
 *     description: Get all genres
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 */
genresRouter.get("/", (req, res) => {
  res.json(musicGenres);
});

export { genresRouter, GENRES_ROUTE };
