const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    createUniversity,
    updateUniversity,
    getAllUniversities,
    getOneUniversity
} = require('../controllers/universityController');

const router = express.Router();

router.post('/create', protect, authorize('admin'), createUniversity);
router.put('/update/:id', protect, authorize('admin'), updateUniversity);
router.get('/', getAllUniversities);
router.get('/:id', getOneUniversity);

module.exports = router;