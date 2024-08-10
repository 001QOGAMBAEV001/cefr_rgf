const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    createGroup,
    getAllGroups,
    getOneGroup
} = require('../controllers/groupController');

const router = express.Router();

router.post('/create', protect, authorize('admin','teacher'), createGroup);
router.get('/', getAllGroups);
router.get('/:id', getOneGroup);

module.exports = router;