import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { albumRouter, ALBUM_ROUTE } from "./routes/albumRoutes.js";
import { artistRouter, ARTIST_ROUTE } from "./routes/artistRoutes.js";
import { genresRouter, GENRES_ROUTE } from "./routes/genresRoutes.js";
import { playlistRouter, PLAYLIST_ROUTE } from "./routes/playlistRoutes.js";
import { homeRouter, HOME_ROUTE } from "./routes/homeRoutes.js";
import {
  locationsRouter,
  LOCATIONS_ROUTE,
} from "./routes/worldLocationsRouter.js";

import { songRouter, SONG_ROUTE } from "./routes/songRoutes.js";

import axios from "axios";

function createApp(configs) {
  // Create the express app
  const app = express();
  app.set("port", configs.PORT); //app.config.from_object(config_obj)

  app.use(cors()); //cors.init_app(app)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(tokenValidator);
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
  app.use(`${HOME_ROUTE}`, homeRouter);
  app.use("/doc", swaggerUi.serve, swaggerUi.setup(docSpecs));
}

async function isTokenValid(token) {
  const urlValidator = process.env.VALIDATION_URL + token;
  try {
    const response = await axios.get(urlValidator);
    return response.status === 200;
  } catch (err) {
    return false;
  }
}

async function tokenValidator(req, res, next) {
  let key = req.headers.api_media;
  if (!key) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }
  if (!(await isTokenValid(key))) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }
  next();
}

export default createApp;
