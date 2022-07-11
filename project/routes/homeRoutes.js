import express from "express";
import { homeData } from "../controllers/homeController.js";

const homeRouter = express.Router();
const HOME_ROUTE = "/home";

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Home related endpoints.
 */

/**
 * @swagger
 * /home/<id>:
 *   get:
 *     summary: Get content of home page
 *     tags: [Home]
 *     description: Get content of home page
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                songs:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/SongResponse'
 *                albums:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/AlbumResponse'
 *                playlists:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/PlaylistResponse'
 */
homeRouter.get("/:id", homeData);

export { homeRouter, HOME_ROUTE };
