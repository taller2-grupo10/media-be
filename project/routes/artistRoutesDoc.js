/**
 * @swagger
 *   components:
 *    schemas:
 *      Artist:
 *        type: object
 *        required:
 *          - name
 *          - uid
 *        properties:
 *          name:
 *            type: string
 *            required: true
 *          uid:
 *            type: string
 *            required: true
 *          location:
 *            type: string
 *            required: false
 *            enum:
 *              $ref: '#/components/schemas/WorldLocation'
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
 *      ArtistResponse:
 *        allOf:
 *          - $ref: '#/components/schemas/Artist'
 *          - type: object
 *            properties:
 *              _id:
 *                type: string
 *                format: uuid
 */
