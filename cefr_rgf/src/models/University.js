const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     University:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: Universitet avtomatik yaratilgan identifikatori
 *         name:
 *           type: string
 *           description: Universitet nomi
 *         address:
 *           type: string
 *           description: Universitet manzili
 *         website:
 *           type: string
 *           description: Universitet veb-sayti
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Universitet yaratilgan sana
 */

const UniversitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Iltimos, universitet nomini kiriting'],
        unique: true,
        trim: true,
        maxlength: [100, 'Universitet nomi 100 ta belgidan oshmasligi kerak']
    },
    address: {
        type: String,
        trim: true,
        maxlength: [200, 'Manzil 200 ta belgidan oshmasligi kerak']
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Iltimos, to\'g\'ri URL manzilini kiriting'
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('University', UniversitySchema);