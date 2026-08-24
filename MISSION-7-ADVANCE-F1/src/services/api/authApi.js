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
  }
};
