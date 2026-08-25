import axiosClient from './axiosClient';

export const authApi = {
  loginUser: async ({ identifier, password }) => {
    // 1. Bypass Admin (Hardcoded per prompt request)
    if (identifier === 'admin.dkv@idn.sch.id' && password === 'admin123dkv') {
      const dummyToken = "dummy_token_admin_" + Math.random().toString(36).substring(2);
      return {
        user: { identifier, role: "ADMIN" },
        token: dummyToken,
        success: true,
        message: "Login berhasil sebagai Admin!",
      };
    }

    // 2. Fetch users to verify standard learner credentials
    // MockAPI doesn't have native authentication filtering on login endpoint. 
    // We fetch users and find the match manually.
    const response = await axiosClient.get('/users');
    const users = response.data;
    
    // Attempt to match either email or username, depending on identifier type, and password
    const user = users.find(u => 
      (u.email === identifier || u.fullName === identifier) && 
      u.password === password
    );

    if (!user) {
      throw new Error("Email atau password tidak sesuai.");
    }

    const token = "dummy_token_login_" + Math.random().toString(36).substring(2);
    
    return {
      user: {
        id: user.id,
        identifier: user.email,
        fullName: user.fullName,
        role: "LEARNER",
      },
      token: token,
      success: true,
      message: "Login berhasil!",
    };
  },

  registerUser: async (payload) => {
    // payload consists of { fullName, email, password }
    const response = await axiosClient.post('/users', payload);
    const user = response.data;
    const token = "dummy_token_register_" + Math.random().toString(36).substring(2);

    // FIX: Clear mocked courses for new user registration to ensure empty dashboard
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
        role: "LEARNER",
      },
      token: token,
      success: true,
      message: "Registrasi berhasil!",
    };
  },

  updateProfile: async (userId, payload) => {
    // In a real app, this would be a PUT or PATCH request to /users/:id
    const response = await axiosClient.put(`/users/${userId}`, payload);
    return {
      success: true,
      message: "Profile updated successfully!",
      data: response.data
    };
  },

  updatePassword: async (userId, payload) => {
    // We fetch the current user to verify the current password, 
    // then update it if it matches. For mockAPI, we'll just update it directly.
    // In a real app, the backend would verify the old password.
    
    // First fetch the user to get existing data (since MockAPI PUT replaces the whole object)
    const userResp = await axiosClient.get(`/users/${userId}`);
    const user = userResp.data;

    if (user.password !== payload.currentPassword) {
      throw new Error("Password saat ini salah.");
    }

    const updatedUser = {
      ...user,
      password: payload.newPassword
    };

    const response = await axiosClient.put(`/users/${userId}`, updatedUser);
    return {
      success: true,
      message: "Password updated successfully!",
      data: response.data
    };
  }
};
