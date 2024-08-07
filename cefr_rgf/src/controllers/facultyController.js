const Faculty = require('../models/Faculty');

exports.createFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.create(req.body);
        res.status(201).json({ success: true, data: faculty });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.updateFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!faculty) {
            return res.status(404).json({ message: 'Fakultet topilmadi' });
        }
        res.status(200).json({ success: true, data: faculty });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: 'Fakultet topilmadi' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.getAllFaculties = async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.status(200).json({ success: true, data: faculties });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.getOneFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: 'Fakultet topilmadi' });
        }
        res.status(200).json({ success: true, data: faculty });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};