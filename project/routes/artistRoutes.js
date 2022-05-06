import express from "express";
import {
  artistCreate,
  artistDelete,
  artistUpdate,
  artistGetByName,
  artistGetByID,
} from "../controllers/artistController.js";

const artistRouter = express.Router();
const ARTIST_ROUTE = "/artists";

artistRouter.post("/", artistCreate);
artistRouter.delete("/:id", artistDelete);
artistRouter.put("/:id", artistUpdate);
artistRouter.get("/:name", artistGetByName);
artistRouter.get("/:id", artistGetByID);

export { artistRouter, ARTIST_ROUTE };
