const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Foydalanuvchini ro'yxatdan o'tkazish
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Foydalanuvchi mavjudligini tekshirish
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "Bu email manzili bilan foydalanuvchi allaqachon ro'yxatdan o'tgan"
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        const token = user.getSignedJwtToken();
        console.log('Generated token:', token);

        // Token strukturasini tekshirish
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decodedToken);

        res.status(201).json({
            success: true,
            token,
            expiresIn: process.env.JWT_EXPIRE
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Foydalanuvchini tizimga kiritish
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Iltimos, email va parolni kiriting' });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Noto\'g\'ri ma\'lumotlar' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Noto\'g\'ri ma\'lumotlar' });
        }
        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// authController.js faylida
exports.logout = (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ success: true, message: 'User logged out successfully' });
};

/*// Tizimdan chiqish//joqarida bar
exports.logout = (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ success: true, data: {} });
};*/


// Joriy foydalanuvchi ma'lumotlarini olish
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};




// Yangi token olish
exports.getToken = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Autentifikatsiya talab qilinadi' });
    }
    const token = req.user.getSignedJwtToken();
    res.status(200).json({ success: true, token });
};

// Token yaratish va jo'natish
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
};