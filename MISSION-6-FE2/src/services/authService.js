export const registerUser = async (payload) => {
  // Simulate API delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Basic validation simulation
      if (!payload.fullName || !payload.email || !payload.password) {
        reject(new Error("Mohon lengkapi semua field yang wajib diisi."));
        return;
      }

      // Simulate successful registration
      const dummyToken = "dummy_token_" + Math.random().toString(36).substr(2);
      localStorage.setItem("auth_token", dummyToken);
      
      resolve({
        success: true,
        message: "Registrasi berhasil!",
        data: {
          user: {
            fullName: payload.fullName,
            email: payload.email,
          },
          token: dummyToken,
        }
      });
    }, 1500);
  });
};

export const loginUser = async (credentials) => {
  // Simulate API delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Basic validation simulation
      if (!credentials.identifier || !credentials.password) {
        reject(new Error("Email/Nama Lengkap dan Password wajib diisi."));
        return;
      }

      // Simulate successful login
      const dummyToken = "dummy_token_login_" + Math.random().toString(36).substr(2);
      localStorage.setItem("auth_token", dummyToken);
      
      resolve({
        success: true,
        message: "Login berhasil!",
        data: {
          user: {
            identifier: credentials.identifier,
          },
          token: dummyToken,
        }
      });
    }, 1500);
  });
};
