const LearningMaterial = require('../models/LearningMaterial');

// Yangi o'quv materialni yaratish
exports.createMaterial = async (req, res) => {
    try {
        req.body.createdBy = req.user.id;
        const material = await LearningMaterial.create(req.body);
        res.status(201).json({
            success: true,
            data: material,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// Barcha materiallarni olish
exports.getMaterials = async (req, res) => {
    try {
        const materials = await LearningMaterial.find();
        res.status(200).json({
            success: true,
            count: materials.length,
            data: materials
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Bitta materialni olish
exports.getMaterial = async (req, res) => {
    try {
        const material = await LearningMaterial.findById(req.params.id);
        if (!material) {
            return res.status(404).json({ success: false, error: 'Material topilmadi' });
        }
        res.status(200).json({ success: true, data: material });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// O'quv materialni yangilash
exports.updateMaterial = async (req, res) => {
    try {
        let material = await LearningMaterial.findById(req.params.id);
        if (!material) {
            return res.status(404).json({
                success: false,
                error: 'O\'quv materiali topilmadi',
            });
        }
        if (material.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                error: 'Ushbu materialni tahrirlash huquqi yo\'q',
            });
        }
        material = await LearningMaterial.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            data: material,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// O'quv materialni o'chirish
exports.deleteMaterial = async (req, res) => {
    try {
        const material = await LearningMaterial.findById(req.params.id);
        if (!material) {
            return res.status(404).json({
                success: false,
                error: 'O\'quv materiali topilmadi',
            });
        }
        if (material.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                error: 'Ushbu materialni o\'chirish huquqi yo\'q',
            });
        }
        await material.remove();
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