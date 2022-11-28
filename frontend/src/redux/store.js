import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import companyReducer from "./slices/companySlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
  },
});
