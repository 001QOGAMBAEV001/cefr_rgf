const University = require('../models/University');

exports.createUniversity = async (req, res) => {
    try {
        const university = await University.create(req.body);
        res.status(201).json({ success: true, data: university });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.updateUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!university) {
            return res.status(404).json({ message: 'Universitet topilmadi' });
        }
        res.status(200).json({ success: true, data: university });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.getAllUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        res.status(200).json({ success: true, data: universities });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.getOneUniversity = async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        if (!university) {
            return res.status(404).json({ message: 'Universitet topilmadi' });
        }
        res.status(200).json({ success: true, data: university });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};