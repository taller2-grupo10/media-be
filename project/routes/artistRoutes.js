import express from "express";
import {
  artistCreate,
  artistUpdate,
  artistGetByName,
  artistGetByID,
  artistGetAll,
} from "../controllers/artistController.js";
import "./artistRoutesDoc.js";

const artistRouter = express.Router();
const ARTIST_ROUTE = "/artists";

/**
 * @swagger
 * tags:
 *   name: Artists
 *   description: Artists related endpoints.
 */

/**
 * @swagger
 * /artists:
 *   post:
 *     summary: Create a new artist
 *     tags: [Artists]
 *     description: Create a new artist
 *     parameters:
 *         - name: body
 *           in: body
 *           required: true
 *           schema:
 *             $ref: '#/components/schemas/Artist'
 *     responses:
 *      '201':
 *        description: Artist created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ArtistResponse'
 */
artistRouter.post("/", artistCreate);

/**
 * @swagger
 * /artists/{id}:
 *   put:
 *     summary: Update an artist
 *     tags: [Artists]
 *     description: Update an artist
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the artist to update
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Album'
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ArtistResponse'
 */
artistRouter.put("/:id", artistUpdate);

/**
 * @swagger
 * /artists/{id}:
 *   get:
 *     summary: Get an artist by id
 *     tags: [Artists]
 *     description: Get an artist by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the artist to get
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ArtistResponse'
 */
artistRouter.get("/:id", artistGetByID);

/**
 * @swagger
 * /artists/name/{name}:
 *   get:
 *     summary: Get an artist by name
 *     tags: [Artists]
 *     description: Get an artist by name
 *     parameters:
 *       - name: name
 *         in: path
 *         description: name of the artist to get
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ArtistResponse'
 */
artistRouter.get("/name/:name", artistGetByName);

/**
 * @swagger
 * /artists:
 *   get:
 *     summary: Get all artists
 *     tags: [Artists]
 *     description: Get all artists
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ArtistResponse'
 */
artistRouter.get("/", artistGetAll);

export { artistRouter, ARTIST_ROUTE };
