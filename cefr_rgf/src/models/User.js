const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Iltimos, ismingizni kiriting'],
    },
    email: {
        type: String,
        required: [true, 'Iltimos, elektron pochtangizni kiriting'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Iltimos, to\'g\'ri elektron pochta manzilini kiriting',
        ],
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        default: 'student',
    },
    password: {
        type: String,
        required: [true, 'Iltimos, parolni kiriting'],
        minlength: 6,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
    try {
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        console.log('JWT_EXPIRE:', process.env.JWT_EXPIRE);

        const token = jwt.sign(
            { id: this._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '30d' }
        );

        console.log('Generated token:', token);

        // Token strukturasini tekshirish
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decodedToken);

        return token;
    } catch (error) {
        console.error('JWT creation error:', error);
        throw error;
    }
};

module.exports = mongoose.model('User', UserSchema);