const express = require('express');
const { createTest, getTests, getTest } = require('../controllers/testController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /tests:
 *   post:
 *     summary: Yangi test yaratish
 *     tags: [Tests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestInput'
 *     responses:
 *       201:
 *         description: Test yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 */
router.post('/', protect, authorize('teacher'), createTest);

/**
 * @swagger
 * /tests:
 *   get:
 *     summary: Barcha testlarni olish
 *     tags: [Tests]
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
 *                     $ref: '#/components/schemas/Test'
 */
router.get('/', getTests);

/**
 * @swagger
 * /tests/{id}:
 *   get:
 *     summary: Bitta testni olish
 *     tags: [Tests]
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
 *               $ref: '#/components/schemas/Test'
 */
router.get('/:id', getTest);

/**
 * @swagger
 * components:
 *   schemas:
 *     Test:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         questions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               questionText:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctAnswer:
 *                 type: number
 *         createdBy:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *     TestInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - questions
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         questions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               questionText:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctAnswer:
 *                 type: number
 */

module.exports = router;