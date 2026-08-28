const courseService = require('../services/courseService');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getAllPublicCourses();
    res.status(200).json(successResponse('Courses retrieved successfully', courses));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(errorResponse(error.message));
    }
    next(error);
  }
};

const getCourseBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const course = await courseService.getCourseDetail(slug);
    res.status(200).json(successResponse('Course detail retrieved successfully', course));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(errorResponse(error.message));
    }
    next(error);
  }
};

module.exports = {
  getAllCourses,
  getCourseBySlug,
};
