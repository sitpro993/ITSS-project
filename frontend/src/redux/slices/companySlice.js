import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanyDetail, fetchCompanys } from '../thunks/companyThunk';

const INIT_STATE = {
  list: {
    data: [],
    loading: false,
    total: 0,
  },
  selected: {
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
      state.list.data = action.payload.data;
      state.list.total = action.payload.total;
    },
    [fetchCompanys.rejected]: (state, _) => {
      state.list.loading = false;
    },
    [fetchCompanyDetail.pending]: (state, _) => {
      state.selected.loading = true;
    },
    [fetchCompanyDetail.fulfilled]: (state, action) => {
      state.selected.loading = false;
      state.selected.data = action.payload.data;
    },
    [fetchCompanyDetail.rejected]: (state, _) => {
      state.selected.loading = false;
    }
  },
});

export const { setCompanys, setCompanysLoading } = companySlice.actions;
export default companySlice.reducer;
