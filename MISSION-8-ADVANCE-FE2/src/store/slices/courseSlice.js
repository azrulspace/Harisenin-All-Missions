import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { courseApi } from '../../services/api/courseApi';

const initialState = {
  courses: [],
  currentCourse: null,
  status: 'idle',
  error: null,
};

export const fetchCourses = createAsyncThunk(
  'course/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseApi.fetchCourses();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch courses');
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  'course/fetchCourseById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await courseApi.fetchCourseById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch course');
    }
  }
);

export const createCourse = createAsyncThunk(
  'course/createCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await courseApi.createCourse(courseData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to create course');
    }
  }
);

export const updateCourse = createAsyncThunk(
  'course/updateCourse',
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const response = await courseApi.updateCourse(id, courseData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to update course');
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'course/deleteCourse',
  async (id, { rejectWithValue }) => {
    try {
      await courseApi.deleteCourse(id);
      return id; // Return id to remove from state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete course');
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    clearCourseError: (state) => {
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch Course By Id
      .addCase(fetchCourseById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Create Course
      .addCase(createCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update Course
      .addCase(updateCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.courses.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        if (state.currentCourse && state.currentCourse.id === action.payload.id) {
          state.currentCourse = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Delete Course
      .addCase(deleteCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = state.courses.filter(c => c.id !== action.payload);
        if (state.currentCourse && state.currentCourse.id === action.payload) {
          state.currentCourse = null;
        }
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { clearCurrentCourse, clearCourseError } = courseSlice.actions;

export default courseSlice.reducer;
