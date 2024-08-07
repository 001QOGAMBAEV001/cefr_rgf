const Group = require('../models/Group');

exports.createGroup = async (req, res) => {
    try {
        const group = await Group.create(req.body);
        res.status(201).json({ success: true, data: group });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json({ success: true, data: groups });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.getOneGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Guruh topilmadi' });
        }
        res.status(200).json({ success: true, data: group });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};