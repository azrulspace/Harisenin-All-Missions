import axiosClient from './axiosClient';

export const learnerApi = {
  getLearners: async () => {
    const response = await axiosClient.get('/users');
    // Filter out ADMINs if they are in the same endpoint
    return response.data.filter(user => user.role === 'LEARNER' || !user.role);
  },

  addLearner: async (learnerData) => {
    // Add default fields for a new learner
    const payload = {
      ...learnerData,
      role: 'LEARNER',
      status: 'Not Verified', // Initial status
      registeredAt: new Date().toISOString(),
      enrolledCourses: []
    };
    const response = await axiosClient.post('/users', payload);
    return response.data;
  },

  updateLearnerStatus: async (id, newStatus) => {
    // Fetch current user first to retain other fields
    const userResp = await axiosClient.get(`/users/${id}`);
    const updatedUser = { ...userResp.data, status: newStatus };
    const response = await axiosClient.put(`/users/${id}`, updatedUser);
    return response.data;
  },

  deleteLearner: async (id) => {
    const response = await axiosClient.delete(`/users/${id}`);
    return response.data;
  },
  
  updateLearner: async (id, updatedData) => {
    const userResp = await axiosClient.get(`/users/${id}`);
    const updatedUser = { ...userResp.data, ...updatedData };
    const response = await axiosClient.put(`/users/${id}`, updatedUser);
    return response.data;
  }
};
