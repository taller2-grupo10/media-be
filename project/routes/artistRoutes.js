import express from "express";
import {
  artistCreate,
  artistDelete,
  artistUpdate,
  artistGetByName,
  artistGetByID,
  artistGetAll,
} from "../controllers/artistController.js";

const artistRouter = express.Router();
const ARTIST_ROUTE = "/artists";

artistRouter.post("/", artistCreate);
artistRouter.delete("/:id", artistDelete);
artistRouter.put("/:id", artistUpdate);
artistRouter.get("/:id", artistGetByID);
artistRouter.get("/name/:name", artistGetByName);
artistRouter.get("/", artistGetAll);

export { artistRouter, ARTIST_ROUTE };
