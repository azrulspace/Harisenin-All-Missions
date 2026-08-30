const adminService = require('../services/adminService');
const { successResponse } = require('../utils/responseFormatter');

// Course
const createCourse = async (req, res, next) => {
  try {
    const course = await adminService.createCourse(req.body);
    res.status(201).json(successResponse('Course created successfully', course));
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await adminService.updateCourse(req.params.id, req.body);
    res.status(200).json(successResponse('Course updated successfully', course));
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    await adminService.deleteCourse(req.params.id);
    res.status(200).json(successResponse('Course deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// Chapter
const createChapter = async (req, res, next) => {
  try {
    const chapter = await adminService.createChapter(req.body);
    res.status(201).json(successResponse('Chapter created successfully', chapter));
  } catch (error) {
    next(error);
  }
};

const updateChapter = async (req, res, next) => {
  try {
    const chapter = await adminService.updateChapter(req.params.id, req.body);
    res.status(200).json(successResponse('Chapter updated successfully', chapter));
  } catch (error) {
    next(error);
  }
};

const deleteChapter = async (req, res, next) => {
  try {
    await adminService.deleteChapter(req.params.id);
    res.status(200).json(successResponse('Chapter deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// Lesson
const createLesson = async (req, res, next) => {
  try {
    const lesson = await adminService.createLesson(req.body);
    res.status(201).json(successResponse('Lesson created successfully', lesson));
  } catch (error) {
    next(error);
  }
};

const updateLesson = async (req, res, next) => {
  try {
    const lesson = await adminService.updateLesson(req.params.id, req.body);
    res.status(200).json(successResponse('Lesson updated successfully', lesson));
  } catch (error) {
    next(error);
  }
};

const deleteLesson = async (req, res, next) => {
  try {
    await adminService.deleteLesson(req.params.id);
    res.status(200).json(successResponse('Lesson deleted successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  createChapter,
  updateChapter,
  deleteChapter,
  createLesson,
  updateLesson,
  deleteLesson,
};
