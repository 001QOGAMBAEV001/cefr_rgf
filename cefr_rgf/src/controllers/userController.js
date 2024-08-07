const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createStudent = async (req, res) => {
    try {
        const { name, email, password, group_id } = req.body;
        const user = await User.create({ name, email, password, group: group_id, role: 'student' });
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' });
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Noto\'g\'ri email yoki parol' });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ success: true, token });
};