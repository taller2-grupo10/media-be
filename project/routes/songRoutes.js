import express from "express";
import {
  songCreate,
  songDelete,
  songUpdate,
  songGetByName,
  songGetByArtistId,
  songGetByAlbumId,
  songGetByID,
  songGetAll,
} from "../controllers/songController.js";

const songRouter = express.Router();
const SONG_ROUTE = "/songs";

songRouter.post("/", songCreate);
songRouter.delete("/:id", songDelete);
songRouter.put("/:id", songUpdate);
songRouter.get("/artistId/:artistId", songGetByArtistId);
songRouter.get("/albumId/:albumId", songGetByAlbumId);
//songRouter.get("/:name", songGetByName);
songRouter.get("/:id", songGetByID);
songRouter.get("/", songGetAll);

export { songRouter, SONG_ROUTE };
