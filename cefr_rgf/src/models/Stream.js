const mongoose = require('mongoose');

const StreamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Iltimos, translyatsiya sarlavhasini kiriting'],
        trim: true,
        maxlength: [100, 'Sarlavha 100 ta belgidan oshmasligi kerak'],
    },
    description: {
        type: String,
        required: [true, 'Iltimos, translyatsiya tavsifini kiriting'],
    },
    twitchUrl: {
        type: String,
        required: [true, 'Iltimos, Twitch havolasini kiriting'],
    },
    startTime: {
        type: Date,
        required: [true, 'Iltimos, boshlanish vaqtini kiriting'],
    },
    endTime: {
        type: Date,
    },
    teacher: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    employee: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    group: {
        type: mongoose.Schema.ObjectId,
        ref: 'Group',
    },
    status: {
        type: String,
        enum: ['planned', 'live', 'ended'],
        default: 'planned',
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Indekslar qo'shish (optional, lekin performance uchun foydali)
StreamSchema.index({ teacher: 1, startTime: -1 });
StreamSchema.index({ employee: 1, startTime: -1 });
StreamSchema.index({ group: 1, startTime: -1 });
StreamSchema.index({ status: 1, startTime: -1 });

module.exports = mongoose.model('Stream', StreamSchema);