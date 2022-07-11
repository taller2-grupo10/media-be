/**
 * @swagger
 *   components:
 *    schemas:
 *      Song:
 *        type: object
 *        required:
 *          - title
 *          - artists
 *          - album
 *          - url
 *        properties:
 *          title:
 *            type: string
 *          artists:
 *            type: object
 *            properties:
 *              artist:
 *                type: string
 *                format: uuid
 *                required: true
 *              name:
 *                type: string
 *                required: true
 *              collaborators:
 *                type: array
 *                items:
 *                  type: string
 *                  format: uuid
 *              collaboratorsNames:
 *                type: array
 *                items:
 *                  type: string
 *                  description: "The name of the collaborators"
 *          album:
 *            type: object
 *            properties:
 *              album:
 *                type: string
 *                format: uuid
 *                required: true
 *              name:
 *                type: string
 *              photoURL:
 *                type: string
 *          genres:
 *            $ref: '#/components/schemas/Genre'
 *          url:
 *            type: string
 *          subscriptionLevel:
 *            type: number
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
 *          isActive:
 *            type: boolean
 *            default: true
 *
 *      SongResponse:
 *        allOf:
 *          - $ref: '#/components/schemas/Song'
 *          - type: object
 *            properties:
 *              _id:
 *                type: string
 *                format: uuid
 */
