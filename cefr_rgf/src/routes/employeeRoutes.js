const express = require('express');

const { protect, authorize } = require('../middleware/auth');
const {
    login,
    createTeacher,
    updateEmployee,
    deleteEmployee,
    getAllAdmins,
    getOneAdmin
} = require('../controllers/employeeController');

const router = express.Router();

router.post('/login', login);
router.post('/create', protect, authorize('admin'), createTeacher);
router.put('/update/:id', protect, authorize('admin'), updateEmployee);
router.delete('/delete/:id', protect, authorize('admin'), deleteEmployee);
router.get('/admins', protect, authorize('admin'), getAllAdmins);
router.get('/:id', protect, authorize('admin'), getOneAdmin);

module.exports = router;