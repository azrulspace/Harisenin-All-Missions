import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../store/slices/authSlice';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const loading = status === 'loading';

  // Using local state for google auth loading to not interfere with redux status if needed, 
  // but we can also just use a separate state. For simplicity, we'll keep local state for Google auth 
  // since it's not currently in Redux, or we can just use the local loading.
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState(null);

  const login = async (credentials) => {
    try {
      const resultAction = await dispatch(loginUser(credentials));
      if (loginUser.fulfilled.match(resultAction)) {
        return resultAction.payload;
      } else {
        throw new Error(resultAction.payload || 'Login gagal');
      }
    } catch (err) {
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    setGoogleLoading(true);
    setGoogleError(null);
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
      setGoogleError(msg);
      throw new Error(msg);
    } finally {
      setGoogleLoading(false);
    }
  };

  const register = async (payload) => {
    try {
      const resultAction = await dispatch(registerUser(payload));
      if (registerUser.fulfilled.match(resultAction)) {
        return resultAction.payload;
      } else {
        throw new Error(resultAction.payload || 'Registrasi gagal');
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    login,
    loginWithGoogle,
    register,
    loading: loading || googleLoading,
    error: error || googleError,
  };
};
