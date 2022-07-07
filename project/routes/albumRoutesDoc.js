/**
 * @swagger
 *   components:
 *    schemas:
 *      Album:
 *        type: object
 *        required:
 *          - title
 *          - artist
 *          - genres
 *        properties:
 *          title:
 *            type: string
 *            required: true
 *          artist:
 *            type: object
 *            properties:
 *              artist:
 *                type: string
 *                format: uuid
 *                required: true
 *              name:
 *                type: string
 *          genres:
 *            $ref: '#/components/schemas/Genre'
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
 *          photoURL:
 *            type: string
 *          description:
 *            type: string
 *          likes:
 *            type: number
 *          isActive:
 *            type: boolean
 *            default: true
 *          subscriptionLevel:
 *            type: number
 *            default: 0
 *
 *      AlbumResponse:
 *        allOf:
 *          - $ref: '#/components/schemas/Album'
 *          - type: object
 *            properties:
 *              _id:
 *                type: string
 *                format: uuid
 */
