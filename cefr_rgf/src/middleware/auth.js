const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        console.log('Token topilmadi');
        return res.status(401).json({ message: 'Ushbu yo\'lga kirish uchun avtorizatsiyadan o\'tish kerak' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        const user = await User.findById(decoded.id);
        if (!user) {
            console.log('Foydalanuvchi topilmadi');
            return res.status(401).json({ message: 'Foydalanuvchi topilmadi' });
        }

        console.log('Foydalanuvchi ma\'lumotlari:', user);
        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Noto\'g\'ri token' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        console.log('Foydalanuvchi roli:', req.user.role);
        console.log('Ruxsat etilgan rollar:', roles);

        if (!roles.includes(req.user.role)) {
            console.log('Ruxsat berilmadi');
            return res.status(403).json({ message: 'Ushbu yo\'lga kirishga ruxsat yo\'q' });
        }

        console.log('Ruxsat berildi');
        next();
    };
};