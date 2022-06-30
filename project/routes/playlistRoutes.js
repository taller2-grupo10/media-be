import express from "express";
import {
  playlistCreate,
  playlistGetAll,
  playlistGetAllNoFilter,
  playlistGetByID,
  playlistGetByUserId,
  playlistUpdate,
} from "../controllers/playlistController.js";
import "./playlistRoutesDoc.js";

const playlistRouter = express.Router();
const PLAYLIST_ROUTE = "/playlists";

/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: Playlists related endpoints.
 */

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     description: Create a new playlist
 *     parameters:
 *         - name: body
 *           in: body
 *           required: true
 *           schema:
 *             $ref: '#/components/schemas/Playlist'
 *     responses:
 *      '201':
 *        description: Playlist created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PlaylistResponse'
 */
playlistRouter.post("/", playlistCreate);

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: Get all playlists
 *     tags: [Playlists]
 *     description: Get all playlists
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/PlaylistResponse'
 */
playlistRouter.get("/", playlistGetAll);

/**
 * @swagger
 * /playlists/all:
 *   get:
 *     summary: Get all playlists without filtering
 *     tags: [Playlists]
 *     description: Get all playlists without filtering
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/PlaylistResponse'
 */
playlistRouter.get("/all", playlistGetAllNoFilter);

/**
 * @swagger
 * /playlists/{id}:
 *   get:
 *     summary: Get a playlist by id
 *     tags: [Playlists]
 *     description: Get a playlist by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the playlist to get
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PlaylistResponse'
 */
playlistRouter.get("/:id", playlistGetByID);

/**
 * @swagger
 * /playlists/userId/{userId}:
 *   get:
 *     summary: Get a playlist by artist/user id
 *     tags: [Playlists]
 *     description: Get a playlist by artist/user id
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: userId from the artist/user to get their playlists
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PlaylistResponse'
 */
playlistRouter.get("/userId/:userId", playlistGetByUserId);

/**
 * @swagger
 * /playlists/{id}:
 *   put:
 *     summary: Update an playlist
 *     tags: [Playlists]
 *     description: Update an playlist
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the playlist to update
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Playlist'
 *     responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PlaylistResponse'
 */
playlistRouter.put("/:id", playlistUpdate);

export { playlistRouter, PLAYLIST_ROUTE };
