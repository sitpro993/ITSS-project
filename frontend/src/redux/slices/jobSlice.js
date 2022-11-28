import { createSlice } from '@reduxjs/toolkit';
import { fetchJobs } from '../thunks/jobThunk';

const INIT_STATE = {
  list: {
    data: [],
    loading: false,
  },
};

export const jobSlice = createSlice({
  name: 'job',
  initialState: INIT_STATE,
  reducers: {
    setJobs: (state, action) => {
      state.list.data = action.payload;
    },
    setJobsLoading: (state, action) => {
      state.list.loading = action.payload;
    },
  },
  extraReducers: {
    [fetchJobs.pending]: (state, _) => {
      state.list.loading = true;
    },
    [fetchJobs.fulfilled]: (state, action) => {
      state.list.loading = false;
      state.list.data = action.payload;
    },
    [fetchJobs.rejected]: (state, _) => {
      state.list.loading = false;
    },
  },
});

export const { setJobs, setJobsLoading } = jobSlice.actions;
export default jobSlice.reducer;
