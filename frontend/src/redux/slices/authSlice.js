import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: JSON.parse(localStorage.getItem("accessToken")),
  refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
  role: JSON.parse(localStorage.getItem("role")),
  userInfo: JSON.parse(localStorage.getItem("userInfo")),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
      state.userInfo = { ...action.payload.userInfo };
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      localStorage.setItem("accessToken", JSON.stringify(state.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(state.refreshToken));
      localStorage.setItem("role", JSON.stringify(state.role));
    },
    logoutAction: (state) => {
      state = { accessToken: undefined, refreshToken: undefined };
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;
