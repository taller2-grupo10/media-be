import express from "express";
import multer from "multer";
import {
  songCreate,
  songGetAll,
  songGetByAlbumId,
  songGetByArtistId,
  songGetByGenre,
  songGetByID,
  songGetByName,
  songUpdate,
  songGetAllNoFilter,
  songGetBySubscriptionLevel,
} from "../controllers/songController.js";
import "./songRoutesDoc.js";

const songRouter = express.Router();
const upload = multer();
const SONG_ROUTE = "/songs";

/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: Songs related endpoints.
 */

/**
 * @swagger
 * /songs:
 *   post:
 *     summary: Create a new song
 *     tags: [Songs]
 *     description: Create a new song
 *     parameters:
 *         - name: file
 *           in: formData
 *           required: true
 *           description: Song file
 *           schema:
 *             type: file
 *         - name: data
 *           in: body
 *           required: true
 *           schema:
 *             $ref: '#/components/schemas/Song'
 *     responses:
 *      '201':
 *        description: Song created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SongResponse'
 */
songRouter.post("/", upload.any(), songCreate);

/**
 * @swagger
 * /songs/{id}:
 *   put:
 *     summary: Update a song
 *     tags: [Songs]
 *     description: Update a song
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the song to update
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Song'
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SongResponse'
 */
songRouter.put("/:id", songUpdate);

/**
 * @swagger
 * /songs/artistId/{id}:
 *   get:
 *     summary: Get songs by an artist id
 *     tags: [Songs]
 *     description: Get songs by an artist id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the artist to get their songs
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/SongResponse'
 */
songRouter.get("/artistId/:artistId", songGetByArtistId);

/**
 * @swagger
 * /songs/albumId/{id}:
 *   get:
 *     summary: Get songs by an album id
 *     tags: [Songs]
 *     description: Get songs by an album id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the album to get their songs
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/SongResponse'
 */
songRouter.get("/albumId/:albumId", songGetByAlbumId);

/**
 * @swagger
 * /songs/name/{name}:
 *   get:
 *     summary: Get songs by name
 *     tags: [Songs]
 *     description: Get songs by name
 *     parameters:
 *       - name: name
 *         in: path
 *         description: name of the song to get
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/SongResponse'
 */
songRouter.get("/name/:name", songGetByName);

/**
 * @swagger
 * /songs/{id}:
 *   get:
 *     summary: Get a song by id
 *     tags: [Songs]
 *     description: Get a song by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the song to get
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SongResponse'
 */
songRouter.get("/:id", songGetByID);

/**
 * @swagger
 * /songs:
 *   get:
 *     summary: Get all songs
 *     tags: [Songs]
 *     description: Get all songs
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/SongResponse'
 */
songRouter.get("/", songGetAll);

/**
 * @swagger
 * /songs/noFilter:
 *   get:
 *     summary: Get all songs without filtering
 *     tags: [Songs]
 *     description: Get all songs without filtering
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/SongResponse'
 */
songRouter.get("/noFilter", songGetAllNoFilter);

/**
 * @swagger
 * /songs/genre/{genre}:
 *   get:
 *     summary: Get songs by a genre name
 *     tags: [Songs]
 *     description: Get songs by a genre name
 *     parameters:
 *       - name: genre
 *         in: path
 *         description: name of the genre to get its songs
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/SongResponse'
 */
songRouter.get("/genre/:genre", songGetByGenre);

/**
 * @swagger
 * /songs/subscription/{subscriptionLevel}:
 *   get:
 *     summary: Get songs by a subscription level
 *     tags: [Songs]
 *     description: Get songs by a subscription level
 *     parameters:
 *       - name: subscriptionLevel
 *         in: path
 *         description: subscription level to get its songs
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/SongResponse'
 */
songRouter.get("/subscription/:subscriptionLevel", songGetBySubscriptionLevel);

export { songRouter, SONG_ROUTE };
