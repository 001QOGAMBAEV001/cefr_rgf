const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    createFaculty,
    updateFaculty,
    deleteFaculty,
    getAllFaculties,
    getOneFaculty
} = require('../controllers/facultyController');

const router = express.Router();

router.post('/create', protect, authorize('admin'), createFaculty);
router.put('/update/:id', protect, authorize('admin'), updateFaculty);
router.delete('/delete/:id', protect, authorize('admin'), deleteFaculty);
router.get('/', getAllFaculties);
router.get('/:id', getOneFaculty);

module.exports = router;