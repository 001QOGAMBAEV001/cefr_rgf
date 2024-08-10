const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Faculty:
 *       type: object
 *       required:
 *         - name
 *         - university
 *       properties:
 *         _id:
 *           type: string
 *           description: Fakultet avtomatik yaratilgan identifikatori
 *         name:
 *           type: string
 *           description: Fakultet nomi
 *         university:
 *           type: string
 *           description: Fakultet tegishli bo'lgan universitet ID si
 *         dean:
 *           type: string
 *           description: Fakultet dekani
 *         departments:
 *           type: array
 *           items:
 *             type: string
 *           description: Fakultetdagi bo'limlar ro'yxati
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fakultet yaratilgan sana
 */

const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Iltimos, fakultet nomini kiriting'],
        trim: true,
        maxlength: [100, 'Fakultet nomi 100 ta belgidan oshmasligi kerak']
    },
    university: {
        type: mongoose.Schema.ObjectId,
        ref: 'University',
        required: [true, 'Iltimos, universitet ID sini kiriting']
    },
    dean: {
        type: String,
        trim: true,
        maxlength: [50, 'Dekan ismi 50 ta belgidan oshmasligi kerak']
    },
    departments: [{
        type: String,
        trim: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Fakultet nomini va universitetini birgalikda noyob qilish
FacultySchema.index({ name: 1, university: 1 }, { unique: true });

module.exports = mongoose.model('Faculty', FacultySchema);