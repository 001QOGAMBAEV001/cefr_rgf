const Employee = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email }).select('+password');

        if (!employee || !(await employee.matchPassword(password))) {
            return res.status(401).json({ message: 'Noto\'g\'ri email yoki parol' });
        }

        sendTokenResponse(employee, 200, res);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
};

exports.createTeacher = async (req, res) => {
    try {
        const { name, email, password, channel_name } = req.body;
        const employee = await Employee.create({ name, email, password, channel_name, role: 'teacher' });
        res.status(201).json({ success: true, data: employee });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!employee) {
            return res.status(404).json({ message: 'Xodim topilmadi' });
        }
        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Xodim topilmadi' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Employee.find({ role: 'admin' });
        res.status(200).json({ success: true, data: admins });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

exports.getOneAdmin = async (req, res) => {
    try {
        const admin = await Employee.findOne({ _id: req.params.id, role: 'admin' });
        if (!admin) {
            return res.status(404).json({ message: 'Admin topilmadi' });
        }
        res.status(200).json({ success: true, data: admin });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ success: true, token });
};