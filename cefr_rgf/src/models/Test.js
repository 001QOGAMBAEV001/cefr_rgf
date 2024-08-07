const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Iltimos, test sarlavhasini kiriting'],
        trim: true,
        maxlength: [100, 'Sarlavha 100 ta belgidan oshmasligi kerak']
    },
    description: {
        type: String,
        required: [true, 'Iltimos, test tavsifini kiriting']
    },
    questions: [{
        questionText: String,
        options: [String],
        correctAnswer: Number
    }],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Test', TestSchema);