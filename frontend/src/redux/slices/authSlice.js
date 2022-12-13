import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetUserInfo } from "../../apis/auth";
import { removeLocalStorageItem } from "../../config/localStorage";

const initialState = {
  accessToken: null,
  user: null,
};

export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (accessToken) => {
    const result = await apiGetUserInfo(accessToken)
    return result;
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserInfo: (state, action)=> {
      state.user = action.payload;
    },
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearData: (state) => {
        state.user = null;
        state.accessToken = null;
        removeLocalStorageItem('accessToken')
    },
    extraReducers: (builder) => {
      builder.addCase(getUserInfo.fulfilled, (state, action) => {   
        if(action.payload){
          state.user = {...action.payload}
        }
      });
    },
  },
});

export const { saveUserInfo, saveAccessToken,clearData  } = authSlice.actions;

export default authSlice.reducer;
