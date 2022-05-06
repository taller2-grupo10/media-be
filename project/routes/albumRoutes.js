import express from "express";
import {
  albumCreate,
  albumDelete,
  albumUpdate,
  albumGetByName,
  albumGetByID,
} from "../controllers/albumController.js";

const albumRouter = express.Router();
const ALBUM_ROUTE = "/albums";

albumRouter.post("/", albumCreate);
albumRouter.delete("/:id", albumDelete);
albumRouter.put("/:id", albumUpdate);
albumRouter.get("/:name", albumGetByName);
albumRouter.get("/:id", albumGetByID);

export { albumRouter, ALBUM_ROUTE };
