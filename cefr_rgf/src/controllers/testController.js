const Test = require('../models/Test');

exports.createTest = async (req, res) => {
    try {
        const test = await Test.create(req.body);
        res.status(201).json({
            success: true,
            data: test
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getTests = async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).json({
            success: true,
            count: tests.length,
            data: tests
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getTest = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ success: false, error: 'Test topilmadi' });
        }
        res.status(200).json({
            success: true,
            data: test
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};