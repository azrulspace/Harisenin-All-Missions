import axiosClient from './axiosClient';

export const courseApi = {
  fetchCourses: async () => {
    const response = await axiosClient.get('/courses');
    return response.data;
  },

  fetchCourseById: async (id) => {
    const response = await axiosClient.get(`/courses/${id}`);
    return response.data;
  },

  createCourse: async (courseData) => {
    const response = await axiosClient.post('/courses', courseData);
    return response.data;
  },

  updateCourse: async (id, courseData) => {
    const response = await axiosClient.put(`/courses/${id}`, courseData);
    return response.data;
  },

  deleteCourse: async (id) => {
    const response = await axiosClient.delete(`/courses/${id}`);
    return response.data;
  }
};
