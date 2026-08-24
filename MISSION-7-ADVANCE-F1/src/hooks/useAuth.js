import { useState } from 'react';
import { authApi } from '../services/api/authApi';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.loginUser(credentials);
      
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user_role", response.user.role);
      localStorage.setItem("user_name", response.user.fullName || response.user.identifier);
      localStorage.setItem("user_email", response.user.identifier);

      return response;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login gagal';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Simulate API response structure
      const fakeToken = "firebase_token_" + user.uid;
      
      localStorage.setItem("auth_token", fakeToken);
      localStorage.setItem("user_role", "LEARNER"); // Default role
      localStorage.setItem("user_name", user.displayName || "Google User");
      localStorage.setItem("user_email", user.email);

      return {
        success: true,
        user: {
          id: user.uid,
          fullName: user.displayName,
          identifier: user.email,
          role: "LEARNER",
        },
        token: fakeToken,
      };
    } catch (err) {
      const msg = err.message || 'Login dengan Google gagal';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.registerUser(payload);
      
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user_role", response.user.role);
      localStorage.setItem("user_name", response.user.fullName);
      localStorage.setItem("user_email", response.user.identifier);

      return response;
    } catch (err) {
      setError(err.message || 'Registrasi gagal');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loginWithGoogle,
    register,
    loading,
    error,
  };
};
