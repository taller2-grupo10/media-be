import express from "express";
import {
  songCreate,
  songUpdate,
  songGetByName,
  songGetByArtistId,
  songGetByAlbumId,
  songGetByID,
  songGetAll,
  songGetByGenre,
} from "../controllers/songController.js";
import multer from "multer";

const songRouter = express.Router();
const upload = multer();
const SONG_ROUTE = "/songs";

songRouter.post("/", upload.any(), songCreate);
songRouter.put("/:id", songUpdate);
songRouter.get("/artistId/:artistId", songGetByArtistId);
songRouter.get("/albumId/:albumId", songGetByAlbumId);
songRouter.get("/name/:name", songGetByName);
songRouter.get("/:id", songGetByID);
songRouter.get("/", songGetAll);
songRouter.get("/genre/:genre", songGetByGenre);

export { songRouter, SONG_ROUTE };
