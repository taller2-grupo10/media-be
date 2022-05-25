import express from "express";
import musicGenres from "../helpers/musicGenres.js";

const genresRouter = express.Router();
const GENRES_ROUTE = "/genres";

genresRouter.get("/", (req, res) => {
  res.json(musicGenres);
});

export { genresRouter, GENRES_ROUTE };
