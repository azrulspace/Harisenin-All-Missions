import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import learnerReducer from './slices/learnerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    learner: learnerReducer,
  },
});
