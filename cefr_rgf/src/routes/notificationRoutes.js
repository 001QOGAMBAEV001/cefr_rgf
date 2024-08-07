const express = require('express');
const { getNotifications, markAsRead } = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Foydalanuvchining xabarnomalarini olish
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
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
 *                     $ref: '#/components/schemas/Notification'
 */
router.get('/', protect, getNotifications);

/**
 * @swagger
 * /notifications/{id}/read:
 *   put:
 *     summary: Xabarnomani o'qilgan deb belgilash
 *     tags: [Notifications]
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
 *         description: Xabarnoma o'qilgan deb belgilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 */
router.put('/:id/read', protect, markAsRead);

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         recipient:
 *           $ref: '#/components/schemas/User'
 *         content:
 *           type: string
 *         type:
 *           type: string
 *         read:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 */

module.exports = router;