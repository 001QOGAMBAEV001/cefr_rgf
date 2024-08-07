const express = require('express');
const {
    createMaterial,
    getMaterials,
    getMaterial,
    updateMaterial,
    deleteMaterial
} = require('../controllers/learningController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /learning:
 *   post:
 *     summary: Yangi o'quv materiali yaratish
 *     tags: [Learning]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningMaterialInput'
 *     responses:
 *       201:
 *         description: O'quv materiali yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningMaterial'
 */
router.post('/', protect, authorize('teacher'), createMaterial);

/**
 * @swagger
 * /learning:
 *   get:
 *     summary: Barcha o'quv materiallarini olish
 *     tags: [Learning]
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
 *                     $ref: '#/components/schemas/LearningMaterial'
 */
router.get('/', getMaterials);

/**
 * @swagger
 * /learning/{id}:
 *   get:
 *     summary: Bitta o'quv materialini olish
 *     tags: [Learning]
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
 *               $ref: '#/components/schemas/LearningMaterial'
 */
router.get('/:id', getMaterial);

/**
 * @swagger
 * /learning/{id}:
 *   put:
 *     summary: O'quv materialini yangilash
 *     tags: [Learning]
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
 *             $ref: '#/components/schemas/LearningMaterialInput'
 *     responses:
 *       200:
 *         description: O'quv materiali yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningMaterial'
 */
router.put('/:id', protect, authorize('teacher'), updateMaterial);

/**
 * @swagger
 * /learning/{id}:
 *   delete:
 *     summary: O'quv materialini o'chirish
 *     tags: [Learning]
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
 *         description: O'quv materiali o'chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 */
router.delete('/:id', protect, authorize('teacher'), deleteMaterial);

/**
 * @swagger
 * components:
 *   schemas:
 *     LearningMaterial:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         content:
 *           type: string
 *         type:
 *           type: string
 *           enum: [reading, listening, speaking, writing]
 *         level:
 *           type: string
 *           enum: [A1, A2, B1, B2, C1, C2]
 *         createdBy:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *     LearningMaterialInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - content
 *         - type
 *         - level
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         content:
 *           type: string
 *         type:
 *           type: string
 *           enum: [reading, listening, speaking, writing]
 *         level:
 *           type: string
 *           enum: [A1, A2, B1, B2, C1, C2]
 */

module.exports = router;