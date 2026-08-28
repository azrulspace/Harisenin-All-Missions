const express = require('express');
const { enrollCourse, updateProgress } = require('../controllers/learnerController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected routes
router.use(authenticateToken);

router.post('/enrollments', enrollCourse);
router.put('/progress', updateProgress);

module.exports = router;
