const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - name
 *         - faculty
 *       properties:
 *         _id:
 *           type: string
 *           description: Guruh identifikatori
 *         name:
 *           type: string
 *           description: Guruh nomi
 *         faculty:
 *           type: string
 *           description: Fakultet identifikatori
 *         students:
 *           type: array
 *           items:
 *             type: string
 *           description: Guruhga tegishli talabalar ro'yxati
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Guruh yaratilgan sana
 */

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Iltimos, guruh nomini kiriting'],
        unique: true,
        trim: true,
        maxlength: [50, 'Guruh nomi 50 belgidan oshmasligi kerak']
    },
    faculty: {
        type: mongoose.Schema.ObjectId,
        ref: 'Faculty',
        required: [true, 'Fakultet ko\'rsatilishi shart']
    },
    students: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Group', GroupSchema);