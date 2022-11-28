import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: JSON.parse(localStorage.getItem("userInfo")),
  refreshtoken: JSON.parse(localStorage.getItem("refreshtoken")),
  role: JSON.parse(localStorage.getItem("role")),
  userInfo: JSON.parse(localStorage.getItem("userInfo")),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshtoken = action.payload.refreshtoken;
      state.role = action.payload.role;
      state.userInfo = { ...action.payload.userInfo };
    },
    logoutAction: (state) => {
      state = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;
