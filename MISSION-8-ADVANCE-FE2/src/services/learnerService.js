// src/services/learnerService.js

/**
 * Gets the list of enrolled course IDs for the current user.
 * In a real app, this would be an API call to a backend.
 * Here we use localStorage to mock persistence.
 */
export const getEnrolledCourses = () => {
  const enrolled = localStorage.getItem('enrolled_courses');
  return enrolled ? JSON.parse(enrolled) : [];
};

/**
 * Gets enrolled courses with progress data.
 */
export const getEnrolledCoursesWithProgress = (allCourses = []) => {
  const enrolledIds = getEnrolledCourses();
  
  return enrolledIds.map(id => {
    const course = allCourses.find(c => String(c.id) === String(id));
    if (!course) return null;
    
    // Mock progress state from localStorage or default to 0
    const progressData = JSON.parse(localStorage.getItem(`progress_${id}`) || '{"completed": 0, "total": 20}');
    // For demo purposes, let's randomly assign some progress if we want, or just stick to 0 for new ones.
    // If it's the specific first course, maybe we can mock some progress so we can see both states.
    if (id === '1' && progressData.completed === 0) {
      progressData.completed = 10;
    }
    
    return {
      courseId: id,
      title: course.title,
      software: course.software,
      thumbnailUrl: course.coverImage,
      totalMaterials: progressData.total,
      completedMaterials: progressData.completed,
      progressPercentage: Math.round((progressData.completed / progressData.total) * 100)
    };
  }).filter(Boolean);
};

/**
 * Checks if a specific course is enrolled.
 * @param {string|number} courseId
 */
export const isEnrolled = (courseId) => {
  const courses = getEnrolledCourses();
  return courses.includes(String(courseId));
};

/**
 * Enrolls the user in a new course.
 * @param {string|number} courseId
 */
export const enrollInCourse = async (courseId) => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const courses = getEnrolledCourses();
      const stringId = String(courseId);
      
      if (!courses.includes(stringId)) {
        courses.push(stringId);
        localStorage.setItem('enrolled_courses', JSON.stringify(courses));
      }
      
      // Initialize progress data
      const progressData = {
        completed: 0,
        total: 6, // Mock total lessons
        completedLessons: [] // Array of completed lesson IDs
      };
      localStorage.setItem(`progress_${stringId}`, JSON.stringify(progressData));
      
      resolve({ success: true, message: 'Berhasil enroll kelas!' });
    }, 500);
  });
};

// --- Course Player & Curriculum Mocks ---

export const getCourseCurriculum = (course) => {
  try {
    if (!course || !course.detailData || !course.detailData.sections) {
      return [];
    }
    return course.detailData.sections.map((section) => ({
      id: section.id,
      title: section.title,
      materialsCount: section.materials.length,
      lessons: section.materials.map(mat => ({
        id: mat.id,
        title: mat.title,
        type: mat.type,
        duration: mat.duration,
        contentUrl: mat.urlLink || '',
        textContent: mat.textContent || '',
        description: mat.description || ''
      }))
    }));
  } catch (err) {
    console.error("Failed to fetch curriculum:", err);
    return [];
  }
};

export const getLessonProgress = (courseId, totalOverride) => {
  const data = localStorage.getItem(`progress_${courseId}`);
  if (data) {
    const parsed = JSON.parse(data);
    if (totalOverride !== undefined && parsed.total !== totalOverride) {
      parsed.total = totalOverride;
      localStorage.setItem(`progress_${courseId}`, JSON.stringify(parsed));
    }
    return parsed;
  }
  const defaultTotal = totalOverride !== undefined ? totalOverride : 0;
  return {
    completed: 0,
    total: defaultTotal,
    completedLessons: []
  };
};

export const markLessonCompleted = (courseId, lessonId) => {
  const progress = getLessonProgress(courseId);
  if (!progress.completedLessons.includes(String(lessonId))) {
    progress.completedLessons.push(String(lessonId));
    progress.completed = progress.completedLessons.length;
    localStorage.setItem(`progress_${courseId}`, JSON.stringify(progress));
  }
  return progress;
};
