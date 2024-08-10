const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    createStudent,
    getAllStudents,
    loginUser
} = require('../controllers/userController');

const router = express.Router();

router.post('/create', protect, authorize('admin'), createStudent);
router.get('/students', protect, authorize('admin'), getAllStudents);
router.post('/login', loginUser);

module.exports = router;