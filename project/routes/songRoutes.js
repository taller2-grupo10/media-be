import express from "express";
import {
  songCreate,
  songDelete,
  songUpdate,
  songGetByName,
  songGetByID,
} from "../controllers/songController.js";

const songRouter = express.Router();
const SONG_ROUTE = "/songs";

songRouter.post("/", songCreate);
songRouter.delete("/:id", songDelete);
songRouter.put("/:id", songUpdate);
songRouter.get("/:name", songGetByName);
songRouter.get("/:id", songGetByID);

export { songRouter, SONG_ROUTE };
