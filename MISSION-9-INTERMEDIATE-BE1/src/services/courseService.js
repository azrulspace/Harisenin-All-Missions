const prisma = require('../config/prisma');

const getAllPublicCourses = async () => {
  const courses = await prisma.course.findMany({
    where: {
      status: {
        in: ['PUBLISHED', 'COMING_SOON'],
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      software: true,
      level: true,
      price: true,
      isFree: true,
      status: true,
      thumbnailUrl: true,
    },
  });
  return courses;
};

const getCourseDetail = async (slug) => {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      educators: {
        include: {
          user: {
            select: {
              fullName: true,
              avatarUrl: true,
            },
          },
        },
      },
      chapters: {
        include: {
          lessons: true,
        },
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
  });

  if (!course) {
    throw Object.assign(new Error('Course not found'), { statusCode: 404 });
  }

  return course;
};

module.exports = {
  getAllPublicCourses,
  getCourseDetail,
};
