const express = require('express');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');

const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', authenticate, createCourse);
router.patch('/:id', authenticate, updateCourse);
router.delete('/:id', authenticate, deleteCourse);

module.exports = router;
