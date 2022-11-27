import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.stringify(localStorage.getItem("USER_INFO")) || {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      state = action.payload;
    },
    logout: (state) => {
      state = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { signin, logout } = authSlice.actions;

export default authSlice.reducer;
