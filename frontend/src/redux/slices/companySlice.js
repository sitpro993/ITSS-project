import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanys } from '../thunks/companyThunk';

const INIT_STATE = {
  list: {
    data: [],
    loading: false,
  },
};

export const companySlice = createSlice({
  name: 'company',
  initialState: INIT_STATE,
  reducers: {
    setCompanys: (state, action) => {
      state.list.data = action.payload;
    },
    setCompanysLoading: (state, action) => {
      state.list.loading = action.payload;
    },
  },
  extraReducers: {
    [fetchCompanys.pending]: (state, _) => {
      state.list.loading = true;
    },
    [fetchCompanys.fulfilled]: (state, action) => {
      state.list.loading = false;
      state.list.data = action.payload;
    },
    [fetchCompanys.rejected]: (state, _) => {
      state.list.loading = false;
    },
  },
});

export const { setCompanys, setCompanysLoading } = companySlice.actions;
export default companySlice.reducer;
