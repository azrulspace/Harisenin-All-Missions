import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCourses as fetchCoursesThunk, 
  fetchCourseById as fetchCourseByIdThunk, 
  createCourse as createCourseThunk, 
  updateCourse as updateCourseThunk, 
  deleteCourse as deleteCourseThunk 
} from '../store/slices/courseSlice';

export const useCourses = () => {
  const dispatch = useDispatch();
  const { courses, currentCourse, status, error } = useSelector((state) => state.course);
  const loading = status === 'loading';

  const fetchCourses = useCallback(async () => {
    try {
      const resultAction = await dispatch(fetchCoursesThunk());
      if (fetchCoursesThunk.fulfilled.match(resultAction)) {
        return resultAction.payload;
      } else {
        throw new Error(resultAction.payload || 'Gagal mengambil data kursus');
      }
    } catch (err) {
      throw err;
    }
  }, [dispatch]);

  const fetchCourseById = useCallback(async (id) => {
    try {
      const resultAction = await dispatch(fetchCourseByIdThunk(id));
      if (fetchCourseByIdThunk.fulfilled.match(resultAction)) {
        return resultAction.payload;
      } else {
        throw new Error(resultAction.payload || 'Gagal mengambil detail kursus');
      }
    } catch (err) {
      throw err;
    }
  }, [dispatch]);

  const createCourse = async (courseData) => {
    try {
      const resultAction = await dispatch(createCourseThunk(courseData));
      if (createCourseThunk.fulfilled.match(resultAction)) {
        return resultAction.payload;
      } else {
        throw new Error(resultAction.payload || 'Gagal membuat kursus baru');
      }
    } catch (err) {
      throw err;
    }
  };

  const updateCourse = async (id, courseData) => {
    try {
      const resultAction = await dispatch(updateCourseThunk({ id, courseData }));
      if (updateCourseThunk.fulfilled.match(resultAction)) {
        return resultAction.payload;
      } else {
        throw new Error(resultAction.payload || 'Gagal memperbarui kursus');
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteCourse = async (id) => {
    try {
      const resultAction = await dispatch(deleteCourseThunk(id));
      if (deleteCourseThunk.fulfilled.match(resultAction)) {
        return resultAction.payload;
      } else {
        throw new Error(resultAction.payload || 'Gagal menghapus kursus');
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    courses,
    course: currentCourse,
    loading,
    error,
    fetchCourses,
    fetchCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};
