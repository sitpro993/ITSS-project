import { createSlice } from '@reduxjs/toolkit';
import { fetchRequests } from '../thunks/requestThunk';

const INIT_STATE = {
  list: {
    data: [],
    loading: false,
  },
};

export const requestSlice = createSlice({
  name: 'request',
  initialState: INIT_STATE,
  reducers: {
    setRequests: (state, action) => {
      state.list.data = action.payload;
    },
    setRequestsLoading: (state, action) => {
      state.list.loading = action.payload;
    },
  },
  extraReducers: {
    [fetchRequests.pending]: (state, _) => {
      state.list.loading = true;
    },
    [fetchRequests.fulfilled]: (state, action) => {
      state.list.loading = false;
      state.list.data = action.payload;
    },
    [fetchRequests.rejected]: (state, _) => {
      state.list.loading = false;
    },
  },
});

export const { setRequests, setRequestsLoading } = requestSlice.actions;
export default requestSlice.reducer;