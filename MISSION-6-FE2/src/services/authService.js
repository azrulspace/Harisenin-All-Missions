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

      // 1. Kredensial Super Admin
      if (
        credentials.identifier === 'admin.dkv@idn.sch.id' &&
        credentials.password === 'admin123dkv'
      ) {
        const dummyToken = "dummy_token_admin_" + Math.random().toString(36).substr(2);
        localStorage.setItem("auth_token", dummyToken);
        localStorage.setItem("user_role", "ADMIN");
        localStorage.setItem("user_name", "Admin Utama");
        localStorage.setItem("user_email", "admin.dkv@idn.sch.id");

        resolve({
          success: true,
          message: "Login berhasil sebagai Admin!",
          data: {
            user: {
              identifier: credentials.identifier,
              role: "ADMIN",
            },
            token: dummyToken,
          }
        });
        return;
      }

      // 2. Kredensial Learner Biasa (Simulasi)
      // Jika email admin.dkv@idn.sch.id tapi password salah, kita anggap kredensial salah total (atau learner biasa tapi tidak terdaftar)
      if (credentials.identifier === 'admin.dkv@idn.sch.id') {
        reject(new Error("Email atau password tidak sesuai."));
        return;
      }

      // Simulate successful learner login
      const dummyToken = "dummy_token_login_" + Math.random().toString(36).substr(2);
      localStorage.setItem("auth_token", dummyToken);
      localStorage.setItem("user_role", "LEARNER");
      
      resolve({
        success: true,
        message: "Login berhasil!",
        data: {
          user: {
            identifier: credentials.identifier,
            role: "LEARNER",
          },
          token: dummyToken,
        }
      });
    }, 1500);
  });
};

export const sendOtpWhatsApp = async (phoneNumber) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!phoneNumber) {
        reject(new Error("Nomor WhatsApp wajib diisi."));
        return;
      }
      resolve({
        success: true,
        message: "Kode OTP telah dikirim.",
        sessionId: "session_" + Math.random().toString(36).substr(2)
      });
    }, 1500);
  });
};

export const verifyOtpWhatsApp = async ({ phoneNumber, otpCode }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!otpCode || otpCode.length < 4) {
        reject(new Error("Kode OTP tidak valid."));
        return;
      }
      
      const dummyToken = "dummy_token_wa_" + Math.random().toString(36).substr(2);
      localStorage.setItem("auth_token", dummyToken);
      
      resolve({
        success: true,
        message: "Verifikasi berhasil!",
        data: {
          user: {
            phoneNumber,
          },
          token: dummyToken,
        }
      });
    }, 1500);
  });
};
