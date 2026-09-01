const prisma = require('../config/prisma');

const enrollCourse = async (userId, courseId) => {
  if (!courseId) {
    throw Object.assign(new Error('Course ID is required'), { statusCode: 400 });
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) {
    throw Object.assign(new Error('Course not found'), { statusCode: 404 });
  }

  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  if (existingEnrollment) {
    throw Object.assign(new Error('Already enrolled in this course'), { statusCode: 400 });
  }

  const newEnrollment = await prisma.enrollment.create({
    data: {
      userId,
      courseId,
      status: 'ACTIVE',
      progressPercentage: 0,
    },
  });

  return newEnrollment;
};

const updateLessonProgress = async (userId, lessonId, data) => {
  if (!lessonId) {
    throw Object.assign(new Error('Lesson ID is required'), { statusCode: 400 });
  }

  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) {
    throw Object.assign(new Error('Lesson not found'), { statusCode: 404 });
  }

  const progress = await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
    update: {
      isCompleted: data.isCompleted,
      lastWatchDuration: data.lastWatchDuration,
      completedAt: data.isCompleted ? new Date() : null,
    },
    create: {
      userId,
      lessonId,
      isCompleted: data.isCompleted || false,
      lastWatchDuration: data.lastWatchDuration || 0,
      completedAt: data.isCompleted ? new Date() : null,
    },
  });

  return progress;
};

module.exports = {
  enrollCourse,
  updateLessonProgress,
};
