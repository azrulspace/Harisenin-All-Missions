import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../services/api/authApi';

// Initial state checks localStorage for existing token/user
const token = localStorage.getItem('auth_token') || null;
let user = null;
try {
  const userStr = localStorage.getItem('user_data');
  if (userStr) {
    user = JSON.parse(userStr);
  } else {
    // Fallback for previous structure if user_data doesn't exist
    const role = localStorage.getItem('user_role');
    const email = localStorage.getItem('user_email');
    const name = localStorage.getItem('user_name');
    if (role && email) {
      user = { role, identifier: email, email, fullName: name };
    }
  }
} catch (e) {
  console.error('Error parsing user data from localStorage', e);
}

const initialState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.loginUser(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authApi.registerUser(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Registration failed');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const response = await authApi.updateProfile(userId, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Update profile failed');
    }
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const response = await authApi.updatePassword(userId, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Update password failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      
      // Clear localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
    },
    clearError: (state) => {
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        
        // Persist
        localStorage.setItem('auth_token', action.payload.token);
        localStorage.setItem('user_data', JSON.stringify(action.payload.user));
        localStorage.setItem('user_role', action.payload.user.role);
        localStorage.setItem('user_email', action.payload.user.identifier || action.payload.user.email);
        if (action.payload.user.fullName) {
          localStorage.setItem('user_name', action.payload.user.fullName);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        // Only set authenticated if a token was actually returned
        if (action.payload.token) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          
          // Persist
          localStorage.setItem('auth_token', action.payload.token);
          localStorage.setItem('user_data', JSON.stringify(action.payload.user));
          localStorage.setItem('user_role', action.payload.user.role);
          localStorage.setItem('user_email', action.payload.user.identifier || action.payload.user.email);
          if (action.payload.user.fullName) {
            localStorage.setItem('user_name', action.payload.user.fullName);
          }
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update user state if the updated user is returned
        if (action.payload.data) {
          state.user = { ...state.user, ...action.payload.data };
          localStorage.setItem('user_data', JSON.stringify(state.user));
          if (state.user.fullName) {
            localStorage.setItem('user_name', state.user.fullName);
          }
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
