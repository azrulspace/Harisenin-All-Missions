const prisma = require('../config/prisma');

const getAllCourses = async () => {
  const courses = await prisma.course.findMany();
  return courses;
};

const getCourseById = async (id) => {
  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) {
    throw Object.assign(new Error('Course not found'), { statusCode: 404 });
  }

  return course;
};

const createCourse = async (payload) => {
  // Need to handle required fields like title, slug, categoryId, level.
  // We can just pass the payload directly and let Prisma validate it.
  const course = await prisma.course.create({
    data: payload,
  });
  return course;
};

const updateCourse = async (id, payload) => {
  // Verify course exists
  const existingCourse = await prisma.course.findUnique({ where: { id } });
  if (!existingCourse) {
    throw Object.assign(new Error('Course not found'), { statusCode: 404 });
  }

  const course = await prisma.course.update({
    where: { id },
    data: payload,
  });
  return course;
};

const deleteCourse = async (id) => {
  // Verify course exists
  const existingCourse = await prisma.course.findUnique({ where: { id } });
  if (!existingCourse) {
    throw Object.assign(new Error('Course not found'), { statusCode: 404 });
  }

  const course = await prisma.course.delete({
    where: { id },
  });
  return course;
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
