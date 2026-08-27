import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { learnerApi } from '../../services/api/learnerApi';

const initialState = {
  learners: [],
  status: 'idle',
  error: null,
};

export const fetchLearners = createAsyncThunk(
  'learner/fetchLearners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await learnerApi.getLearners();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch learners');
    }
  }
);

export const addLearner = createAsyncThunk(
  'learner/addLearner',
  async (learnerData, { rejectWithValue }) => {
    try {
      const response = await learnerApi.addLearner(learnerData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to add learner');
    }
  }
);

export const updateLearnerStatus = createAsyncThunk(
  'learner/updateLearnerStatus',
  async ({ id, newStatus }, { rejectWithValue }) => {
    try {
      const response = await learnerApi.updateLearnerStatus(id, newStatus);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to update learner status');
    }
  }
);

export const updateLearner = createAsyncThunk(
  'learner/updateLearner',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await learnerApi.updateLearner(id, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to update learner');
    }
  }
);

export const deleteLearner = createAsyncThunk(
  'learner/deleteLearner',
  async (id, { rejectWithValue }) => {
    try {
      await learnerApi.deleteLearner(id);
      return id; // Return id to remove from state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete learner');
    }
  }
);

const learnerSlice = createSlice({
  name: 'learner',
  initialState,
  reducers: {
    clearLearnerError: (state) => {
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Learners
      .addCase(fetchLearners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLearners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.learners = action.payload;
      })
      .addCase(fetchLearners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Add Learner
      .addCase(addLearner.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addLearner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.learners.push(action.payload);
      })
      .addCase(addLearner.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update Learner Status
      .addCase(updateLearnerStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateLearnerStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.learners.findIndex(l => l.id === action.payload.id);
        if (index !== -1) {
          state.learners[index] = action.payload;
        }
      })
      .addCase(updateLearnerStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update Learner
      .addCase(updateLearner.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateLearner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.learners.findIndex(l => l.id === action.payload.id);
        if (index !== -1) {
          state.learners[index] = action.payload;
        }
      })
      .addCase(updateLearner.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Delete Learner
      .addCase(deleteLearner.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteLearner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.learners = state.learners.filter(l => l.id !== action.payload);
      })
      .addCase(deleteLearner.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { clearLearnerError } = learnerSlice.actions;

export default learnerSlice.reducer;
