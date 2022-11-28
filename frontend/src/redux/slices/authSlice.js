import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("USER_INFO")),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      console.log(action.payload);
      state.userInfo = { ...action.payload };
    },
    logoutAction: (state) => {
      state = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;
