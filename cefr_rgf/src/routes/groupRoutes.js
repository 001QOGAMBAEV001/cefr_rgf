const express = require('express');
const { createGroup, getAllGroups, getOneGroup } = require('../controllers/groupController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('admin', 'teacher'), createGroup);
router.get('/', getAllGroups);
router.get('/:id', getOneGroup);

module.exports = router;