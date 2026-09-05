import axiosClient from './axiosClient';

export const authApi = {
  loginUser: async ({ identifier, password }) => {
    // We send identifier as 'email' since the new BE uses email for login
    const response = await axiosClient.post('/auth/login', {
      email: identifier,
      password: password
    });
    
    // The backend returns { status: 'success', data: { user, token } }
    const { user, token } = response.data.data;
    
    return {
      user: {
        id: user.id,
        identifier: user.email,
        fullName: user.fullName,
        role: user.role === 'STUDENT' ? 'LEARNER' : user.role, // Map STUDENT to LEARNER for FE compatibility
        isVerified: user.isVerified
      },
      token: token,
      success: true,
      message: "Login berhasil!",
    };
  },

  registerUser: async (payload) => {
    // payload consists of { fullName, email, password }
    const response = await axiosClient.post('/auth/register', {
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      role: 'STUDENT' // default role
    });
    
    // The backend returns { status: 'success', data: { user } }
    // Note: Register does not return a token in our BE, user needs to login after verification.
    // However, to keep the FE flow working if it expects a token (or we can just return success).
    // Let's check what the FE expects. FE expects `token` if it auto-logs in.
    // If the BE doesn't return a token on register, we will just return success.
    const user = response.data.data.user;

    // Clear mocked courses for new user registration to ensure empty dashboard
    localStorage.removeItem('enrolled_courses');
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('progress_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));

    return {
      user: {
        id: user.id,
        identifier: user.email,
        fullName: user.fullName,
        role: user.role === 'STUDENT' ? 'LEARNER' : user.role,
      },
      token: null, // User must verify email and then login
      success: true,
      message: "Registrasi berhasil! Silakan cek email untuk verifikasi.",
    };
  },

  updateProfile: async (userId, payload) => {
    // In our current BE, there is no generic user update route.
    // This might throw 404 until implemented in BE, but we leave the call structure.
    const response = await axiosClient.put(`/users/${userId}`, payload);
    return {
      success: true,
      message: "Profile updated successfully!",
      data: response.data.data || response.data
    };
  },

  updatePassword: async (userId, payload) => {
    // Similar to above, needs BE implementation.
    const response = await axiosClient.put(`/users/${userId}/password`, payload);
    return {
      success: true,
      message: "Password updated successfully!",
      data: response.data.data || response.data
    };
  }
};
