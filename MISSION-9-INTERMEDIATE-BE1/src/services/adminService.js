const prisma = require('../config/prisma');

// Courses
const createCourse = async (data) => {
  return prisma.course.create({
    data,
  });
};

const updateCourse = async (id, data) => {
  return prisma.course.update({
    where: { id },
    data,
  });
};

const deleteCourse = async (id) => {
  return prisma.course.delete({
    where: { id },
  });
};

// Chapters
const createChapter = async (data) => {
  return prisma.chapter.create({
    data,
  });
};

const updateChapter = async (id, data) => {
  return prisma.chapter.update({
    where: { id },
    data,
  });
};

const deleteChapter = async (id) => {
  return prisma.chapter.delete({
    where: { id },
  });
};

// Lessons (Assuming there might be lessons CRUD as well per requirements)
const createLesson = async (data) => {
  return prisma.lesson.create({
    data,
  });
};

const updateLesson = async (id, data) => {
  return prisma.lesson.update({
    where: { id },
    data,
  });
};

const deleteLesson = async (id) => {
  return prisma.lesson.delete({
    where: { id },
  });
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
