import { useState, useCallback } from 'react';
import { courseApi } from '../services/api/courseApi';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseApi.fetchCourses();
      setCourses(data);
      return data;
    } catch (err) {
      setError(err.message || 'Gagal mengambil data kursus');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCourseById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseApi.fetchCourseById(id);
      setCourse(data);
      return data;
    } catch (err) {
      setError(err.message || 'Gagal mengambil detail kursus');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCourse = async (courseData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseApi.createCourse(courseData);
      setCourses((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message || 'Gagal membuat kursus baru');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (id, courseData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseApi.updateCourse(id, courseData);
      setCourses((prev) => prev.map((c) => (c.id === id ? data : c)));
      return data;
    } catch (err) {
      setError(err.message || 'Gagal memperbarui kursus');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await courseApi.deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err.message || 'Gagal menghapus kursus');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    course,
    loading,
    error,
    fetchCourses,
    fetchCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};
