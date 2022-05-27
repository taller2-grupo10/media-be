import express from "express";
import {
  playlistCreate,
  playlistGetByID,
  playlistGetByUserId,
  playlistUpdate,
  playlistGetAll,
} from "../controllers/playlistController.js";

const playlistRouter = express.Router();
const PLAYLIST_ROUTE = "/playlists";

playlistRouter.post("/", playlistCreate);
playlistRouter.get("/", playlistGetAll);
playlistRouter.get("/:id", playlistGetByID);
playlistRouter.get("/userId/:userId", playlistGetByUserId);
playlistRouter.put("/:id", playlistUpdate);

export { playlistRouter, PLAYLIST_ROUTE };
