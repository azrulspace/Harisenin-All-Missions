const express = require('express');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');

const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', authenticateToken, createCourse);
router.patch('/:id', authenticateToken, updateCourse);
router.delete('/:id', authenticateToken, deleteCourse);

module.exports = router;
