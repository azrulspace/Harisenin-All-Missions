const learnerService = require('../services/learnerService');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const enrollCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    
    const enrollment = await learnerService.enrollCourse(userId, courseId);
    res.status(201).json(successResponse('Successfully enrolled', enrollment));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(errorResponse(error.message));
    }
    next(error);
  }
};

const updateProgress = async (req, res, next) => {
  try {
    const { lessonId, isCompleted, lastWatchDuration } = req.body;
    const userId = req.user.id;
    
    const progress = await learnerService.updateLessonProgress(userId, lessonId, {
      isCompleted,
      lastWatchDuration,
    });
    
    res.status(200).json(successResponse('Lesson progress updated successfully', progress));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(errorResponse(error.message));
    }
    next(error);
  }
};

module.exports = {
  enrollCourse,
  updateProgress,
};
