const Group = require('../models/Group');

exports.createGroup = async (req, res) => {
    try {
        const { name } = req.body;

        // Guruh nomining noyobligini tekshirish
        const existingGroup = await Group.findOne({ name });
        if (existingGroup) {
            return res.status(400).json({ success: false, message: 'Bu nomdagi guruh allaqachon mavjud' });
        }

        const group = await Group.create({ name });
        res.status(201).json({ success: true, data: group });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find().select('name');
        res.status(200).json({ success: true, data: groups });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.getOneGroup = async (req, res) => {
    try {
        const group = await Group.findOne({ name: req.params.name });
        if (!group) {
            return res.status(404).json({ success: false, message: 'Guruh topilmadi' });
        }
        res.status(200).json({ success: true, data: group });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Xatolik yuz berdi', error: error.message });
    }
};

// Yangi funksiya: Guruhni nomi bo'yicha yangilash
exports.updateGroup = async (req, res) => {
    try {
        const { newName } = req.body;
        const group = await Group.findOneAndUpdate(
            { name: req.params.name },
            { name: newName },
            { new: true, runValidators: true }
        );
        if (!group) {
            return res.status(404).json({ success: false, message: 'Guruh topilmadi' });
        }
        res.status(200).json({ success: true, data: group });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Xatolik yuz berdi', error: error.message });
    }
};

// Yangi funksiya: Guruhni nomi bo'yicha o'chirish
exports.deleteGroup = async (req, res) => {
    try {
        const group = await Group.findOneAndDelete({ name: req.params.name });
        if (!group) {
            return res.status(404).json({ success: false, message: 'Guruh topilmadi' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Xatolik yuz berdi', error: error.message });
    }
};