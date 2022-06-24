import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { albumRouter, ALBUM_ROUTE } from "./routes/albumRoutes.js";
import { artistRouter, ARTIST_ROUTE } from "./routes/artistRoutes.js";
import { genresRouter, GENRES_ROUTE } from "./routes/genresRoutes.js";
import { playlistRouter, PLAYLIST_ROUTE } from "./routes/playlistRoutes.js";
import {
  locationsRouter,
  LOCATIONS_ROUTE,
} from "./routes/worldLocationsRouter.js";

import { songRouter, SONG_ROUTE } from "./routes/songRoutes.js";

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

const docOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Spotifiuby Media BE",
      version: "0.1",
      description: "Documentation of Spotifiuby",
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Local server",
      },
      {
        url: "https://media-be-spotifiuby-staging.herokuapp.com/",
        description: "Staging server",
      },
      {
        url: "https://media-be-spotifiuby.herokuapp.com/",
        description: "Production server",
      },
    ],
  },
  apis: ["project/routes/*.js"],
};

const docSpecs = swaggerJsdoc(docOptions);

function registerRoutes(app) {
  // Register the routes
  app.get("/", (req, res) => res.send("[STAGING] Hello."));
  app.use(`${SONG_ROUTE}`, songRouter);
  app.use(`${ARTIST_ROUTE}`, artistRouter);
  app.use(`${ALBUM_ROUTE}`, albumRouter);
  app.use(`${GENRES_ROUTE}`, genresRouter);
  app.use(`${PLAYLIST_ROUTE}`, playlistRouter);
  app.use(`${LOCATIONS_ROUTE}`, locationsRouter);
  app.use("/doc", swaggerUi.serve, swaggerUi.setup(docSpecs));
  //console.log("docSpecs", docSpecs);
}

export default createApp;
