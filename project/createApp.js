import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { songRouter, SONG_ROUTE } from "./routes/songRoutes.js";
import { artistRouter, ARTIST_ROUTE } from "./routes/artistRoutes.js";
import { albumRouter, ALBUM_ROUTE } from "./routes/albumRoutes.js";
import { genresRouter, GENRES_ROUTE } from "./routes/genresRoutes.js";
import { playlistRouter, PLAYLIST_ROUTE } from "./routes/playlistRoutes.js";
import {
  locationsRouter,
  LOCATIONS_ROUTE,
} from "./routes/worldLocationsRouter.js";

function createApp(configs) {
  // Create the express app
  const app = express();
  app.set("port", configs.PORT); //app.config.from_object(config_obj)

  app.use(cors()); //cors.init_app(app)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  registerRoutes(app);
  return app;
}

function registerRoutes(app) {
  // Register the routes
  app.get("/", (req, res) => res.send("[STAGING] Hello."));
  app.use(`${SONG_ROUTE}`, songRouter);
  app.use(`${ARTIST_ROUTE}`, artistRouter);
  app.use(`${ALBUM_ROUTE}`, albumRouter);
  app.use(`${GENRES_ROUTE}`, genresRouter);
  app.use(`${PLAYLIST_ROUTE}`, playlistRouter);
  app.use(`${LOCATIONS_ROUTE}`, locationsRouter);
}

export default createApp;
