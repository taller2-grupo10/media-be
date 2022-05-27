import express from "express";
import {
  albumCreate,
  albumUpdate,
  albumGetByArtistId,
  albumGetByID,
  albumGetAll,
  albumGetByGenre,
} from "../controllers/albumController.js";
import multer from "multer";

const albumRouter = express.Router();
const upload = multer();
const ALBUM_ROUTE = "/albums";

albumRouter.post("/", upload.any(), albumCreate);
albumRouter.put("/:id", albumUpdate);
albumRouter.get("/artistId/:artistId", albumGetByArtistId);
//albumRouter.get("/:name", albumGetByName);
albumRouter.get("/:id", albumGetByID);
albumRouter.get("/", albumGetAll);
albumRouter.get("/genre/:genre", albumGetByGenre);

export { albumRouter, ALBUM_ROUTE };
