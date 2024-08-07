const Stream = require('../models/Stream');
const Notification = require('../models/Notification');
const User = require('../models/User');

// Video yaratish (mavjud funksiya)
exports.createVideo = async (req, res) => {
    try {
        const { employee_id, group_id } = req.body;
        const stream = await Stream.create({ employee: employee_id, group: group_id });
        res.status(201).json({ success: true, data: stream });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

// Yangi translyatsiya yaratish
exports.createStream = async (req, res) => {
    try {
        req.body.teacher = req.user.id;
        const stream = await Stream.create(req.body);

        // O'qituvchilarga xabarnoma yuborish
        const teachers = await User.find({ role: 'teacher', _id: { $ne: req.user.id } });
        const notifications = teachers.map(teacher => ({
            recipient: teacher._id,
            content: `Yangi translyatsiya: "${stream.title}" ${stream.startTime} da boshlanadi.`,
            type: 'new_stream',
        }));
        await Notification.insertMany(notifications);

        res.status(201).json({
            success: true,
            data: stream,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};






// Translyatsiyani yangilash
exports.updateStream = async (req, res) => {
    try {
        let stream = await Stream.findById(req.params.id);

        if (!stream) {
            return res.status(404).json({
                success: false,
                error: 'Translyatsiya topilmadi',
            });
        }

        if (stream.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                error: 'Ushbu translyatsiyani tahrirlash huquqi yo\'q',
            });
        }

        stream = await Stream.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: stream,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// Translyatsiyani o'chirish
exports.deleteStream = async (req, res) => {
    try {
        const stream = await Stream.findById(req.params.id);

        if (!stream) {
            return res.status(404).json({
                success: false,
                error: 'Translyatsiya topilmadi',
            });
        }

        if (stream.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                error: 'Ushbu translyatsiyani o\'chirish huquqi yo\'q',
            });
        }

        await stream.remove();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};



// Bitta translyatsiyani olish
exports.getStream = async (req, res) => {
    try {
        const stream = await Stream.findById(req.params.id).populate('teacher', 'name').populate('group', 'name');

        if (!stream) {
            return res.status(404).json({
                success: false,
                error: 'Translyatsiya topilmadi',
            });
        }

        res.status(200).json({
            success: true,
            data: stream,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};



// Faqat faol translyatsiyalarni olish
exports.getActiveStreams = async (req, res) => {
    try {
        const now = new Date();
        const activeStreams = await Stream.find({
            startTime: { $lte: now },
            endTime: { $gte: now }
        }).populate('teacher', 'name').populate('group', 'name');

        res.status(200).json({
            success: true,
            count: activeStreams.length,
            data: activeStreams,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// O'qituvchining translyatsiyalarini olish
exports.getTeacherStreams = async (req, res) => {
    try {
        const streams = await Stream.find({ teacher: req.user.id }).populate('teacher', 'name').populate('group', 'name');

        res.status(200).json({
            success: true,
            count: streams.length,
            data: streams,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// Guruh translyatsiyalarini olish
exports.getGroupStreams = async (req, res) => {
    try {
        const streams = await Stream.find({ group: req.params.groupId }).populate('teacher', 'name').populate('group', 'name');

        res.status(200).json({
            success: true,
            count: streams.length,
            data: streams,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};