import express from "express";
import multer from "multer";
import {
  albumCreate,
  albumGetAll,
  albumGetAllNoFilter,
  albumGetByArtistId,
  albumGetByGenre,
  albumGetByID,
  albumUpdate,
  albumGetBySubscriptionLevel,
} from "../controllers/albumController.js";
import "./albumRoutesDoc.js";

const albumRouter = express.Router();
const upload = multer();
const ALBUM_ROUTE = "/albums";

/**
 * @swagger
 * tags:
 *   name: Albums
 *   description: Albums related endpoints.
 */

/**
 * @swagger
 * /albums:
 *   post:
 *     summary: Create a new album
 *     tags: [Albums]
 *     description: Create a new album
 *     parameters:
 *         - name: file
 *           in: formData
 *           required: true
 *           description: Album image
 *           schema:
 *             type: file
 *         - name: data
 *           in: body
 *           required: true
 *           schema:
 *             $ref: '#/components/schemas/Album'
 *     responses:
 *      '201':
 *        description: Album created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AlbumResponse'
 */
albumRouter.post("/", upload.any(), albumCreate);

/**
 * @swagger
 * /albums/{id}:
 *   put:
 *     summary: Update an album
 *     tags: [Albums]
 *     description: Update an album
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the album to update
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
 *              $ref: '#/components/schemas/AlbumResponse'
 */
albumRouter.put("/:id", albumUpdate);

/**
 * @swagger
 * /albums/artistId/{id}:
 *   get:
 *     summary: Get albums by an artist id
 *     tags: [Albums]
 *     description: Get albums by an artist id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the artist to get their albums
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
 *                $ref: '#/components/schemas/AlbumResponse'
 */
albumRouter.get("/artistId/:artistId", albumGetByArtistId);

//albumRouter.get("/:name", albumGetByName);

/**
 * @swagger
 * /albums/{id}:
 *   get:
 *     summary: Get an album by id
 *     tags: [Albums]
 *     description: Get an album by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the album to get
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AlbumResponse'
 */
albumRouter.get("/:id", albumGetByID);

/**
 * @swagger
 * /albums:
 *   get:
 *     summary: Get all albums
 *     tags: [Albums]
 *     description: Get all albums
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/AlbumResponse'
 */
albumRouter.get("/", albumGetAll);

/**
 * @swagger
 * /albums/noFilter/all:
 *   get:
 *     summary: Get all albums without filtering
 *     tags: [Albums]
 *     description: Get all albums without filtering
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/AlbumResponse'
 */
albumRouter.get("/noFilter/all", albumGetAllNoFilter);

/**
 * @swagger
 * /albums/genre/{genre}:
 *   get:
 *     summary: Get albums by a genre name
 *     tags: [Albums]
 *     description: Get albums by a genre name
 *     parameters:
 *       - name: genre
 *         in: path
 *         description: name of the genre to get its albums
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
 *                $ref: '#/components/schemas/AlbumResponse'
 */
albumRouter.get("/genre/:genre", albumGetByGenre);

/**
 * @swagger
 * /albums/subscription/{subscriptionLevel}:
 *   get:
 *     summary: Get albums by a subscription level
 *     tags: [Albums]
 *     description: Get albums by a subscription level
 *     parameters:
 *       - name: subscriptionLevel
 *         in: path
 *         description: subscription level to get its albums
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
 *                $ref: '#/components/schemas/AlbumResponse'
 */
albumRouter.get(
  "/subscription/:subscriptionLevel",
  albumGetBySubscriptionLevel,
);

export { albumRouter, ALBUM_ROUTE };
