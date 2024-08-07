const mongoose = require('mongoose');

const LearningMaterialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Iltimos, material sarlavhasini kiriting'],
        trim: true,
        maxlength: [100, 'Sarlavha 100 ta belgidan oshmasligi kerak'],
    },
    description: {
        type: String,
        required: [true, 'Iltimos, material tavsifini kiriting'],
    },
    content: {
        type: String,
        required: [true, 'Iltimos, material matnini kiriting'],
    },
    type: {
        type: String,
        enum: ['reading', 'listening', 'speaking', 'writing'],
        required: [true, 'Iltimos, material turini kiriting'],
    },
    level: {
        type: String,
        enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
        required: [true, 'Iltimos, CEFR darajasini kiriting'],
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('LearningMaterial', LearningMaterialSchema);