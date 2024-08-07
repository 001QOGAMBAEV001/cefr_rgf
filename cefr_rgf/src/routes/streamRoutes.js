const express = require('express');
const {
    createStream,
    getStreams,
    getStream,
    updateStream,
    deleteStream
} = require('../controllers/streamController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /streams:
 *   get:
 *     summary: Barcha translyatsiyalarni olish
 *     tags: [Streams]
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli so'rov
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Stream'
 */
router.get('/', (req, res, next) => {
    try {
        getStreams(req, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /streams:
 *   post:
 *     summary: Yangi translyatsiya yaratish
 *     tags: [Streams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StreamInput'
 *     responses:
 *       201:
 *         description: Translyatsiya yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stream'
 */
router.post('/', protect, authorize('teacher'), createStream);

/**
 * @swagger
 * /streams/{id}:
 *   get:
 *     summary: Bitta translyatsiyani olish
 *     tags: [Streams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli so'rov
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stream'
 */
router.get('/:id', getStream);

/**
 * @swagger
 * /streams/{id}:
 *   put:
 *     summary: Translyatsiyani yangilash
 *     tags: [Streams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StreamInput'
 *     responses:
 *       200:
 *         description: Translyatsiya yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stream'
 */
router.put('/:id', protect, authorize('teacher', 'admin'), updateStream);

/**
 * @swagger
 * /streams/{id}:
 *   delete:
 *     summary: Translyatsiyani o'chirish
 *     tags: [Streams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Translyatsiya o'chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 */
router.delete('/:id', protect, authorize('teacher', 'admin'), deleteStream);

/**
 * @swagger
 * components:
 *   schemas:
 *     Stream:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         twitchUrl:
 *           type: string
 *         startTime:
 *           type: string
 *           format: date-time
 *         endTime:
 *           type: string
 *           format: date-time
 *         teacher:
 *           $ref: '#/components/schemas/User'
 *         group:
 *           $ref: '#/components/schemas/Group'
 *         status:
 *           type: string
 *           enum: [planned, live, ended]
 *         views:
 *           type: integer
 *         likes:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *     StreamInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - twitchUrl
 *         - startTime
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         twitchUrl:
 *           type: string
 *         startTime:
 *           type: string
 *           format: date-time
 *         endTime:
 *           type: string
 *           format: date-time
 *         group:
 *           type: string
 */

module.exports = router;