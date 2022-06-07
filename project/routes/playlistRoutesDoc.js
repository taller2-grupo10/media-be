/**
 * @swagger
 *   components:
 *    schemas:
 *      Playlist:
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - owner
 *          - songs
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          owner:
 *            type: string
 *            format: uuid
 *          songs:
 *            type: array
 *            items:
 *              type: string
 *              format: uuid
 *          collaborators:
 *            type: array
 *            items:
 *              type: string
 *              description: "uid of the collaborator"
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *          plays:
 *            type: number
 *            default: 0
 *          isDeleted:
 *            type: boolean
 *            default: false
 *
 *      PlaylistResponse:
 *        allOf:
 *          - $ref: '#/components/schemas/Playlist'
 *          - type: object
 *            properties:
 *              _id:
 *                type: string
 *                format: uuid
 */
