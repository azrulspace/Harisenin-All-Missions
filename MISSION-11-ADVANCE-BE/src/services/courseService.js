const prisma = require('../config/prisma');

const getAllCourses = async (query = {}) => {
  const { search, category, level, sort } = query;
  
  let where = {};
  
  if (search) {
    where.title = { contains: search, mode: 'insensitive' };
  }
  
  if (category) {
    if (!isNaN(category)) {
      where.categoryId = parseInt(category);
    }
  }
  
  if (level) {
    where.level = level.toUpperCase();
  }

  let orderBy = {};
  if (sort) {
    if (sort === 'latest') orderBy = { createdAt: 'desc' };
    else if (sort === 'oldest') orderBy = { createdAt: 'asc' };
    else if (sort === 'price_asc') orderBy = { price: 'asc' };
    else if (sort === 'price_desc') orderBy = { price: 'desc' };
  }

  const courses = await prisma.course.findMany({
    where,
    orderBy,
  });
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
  const course = await prisma.course.create({
    data: payload,
  });
  return course;
};

const updateCourse = async (id, payload) => {
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
