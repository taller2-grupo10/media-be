import express from "express";
import {
  albumCreate,
  albumDelete,
  albumUpdate,
  albumGetByArtistId,
  albumGetByID,
  albumGetAll,
} from "../controllers/albumController.js";

const albumRouter = express.Router();
const ALBUM_ROUTE = "/albums";

albumRouter.post("/", albumCreate);
albumRouter.delete("/:id", albumDelete);
albumRouter.put("/:id", albumUpdate);
albumRouter.get("/artistId/:artistId", albumGetByArtistId);
//albumRouter.get("/:name", albumGetByName);
albumRouter.get("/:id", albumGetByID);
albumRouter.get("/", albumGetAll);

export { albumRouter, ALBUM_ROUTE };
