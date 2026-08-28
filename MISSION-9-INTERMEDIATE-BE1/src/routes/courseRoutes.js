const express = require('express');
const { getAllCourses, getCourseBySlug } = require('../controllers/courseController');

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:slug', getCourseBySlug);

module.exports = router;
