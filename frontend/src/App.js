import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { createTheme, CssBaseline, responsiveFontSizes } from "@mui/material";
import AppRouter from "./routes";
import { customTheme } from "./config/theme";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorageItem } from "./config/localStorage";
import { clearData, getUserInfo, saveAccessToken, saveUserInfo } from "./redux/slices/authSlice";
import { apiGetUserInfo } from "./apis/auth";
function App() {
  
  const token = useSelector((s) => s.auth.accessToken);
  const userInfo = useSelector((s) => s.auth.user);
  const dispatch = useDispatch()
  const theme = responsiveFontSizes(createTheme({ ...customTheme }));

  // useEffect(() => {
  //   const getUser = async () => {
  //     const access_token = await getLocalStorageItem(
  //       "accessToken"
  //     );
  //     console.log(access_token)
  //     if (!access_token) {
  //       dispatch(clearData())
  //     } else {
  //       dispatch(saveAccessToken(access_token));
  //       dispatch(getUserInfo(access_token));
  //     }
  //   };
  //   window.addEventListener('storage', getUser);
  //   return () => {
  //     window.removeEventListener('storage', getUser);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
  
    const getUser = async () => {
      if (token) {
        if (!userInfo) {
          const u = await apiGetUserInfo(token)
          // dispatch(getUserInfo(token));
          if(u){
            dispatch(saveUserInfo(u))
          }
        }
      } else {
        const access_token = await getLocalStorageItem(
          "accessToken"
        );
        if (access_token) {
          dispatch(saveAccessToken(access_token));
          //dispatch(getUserInfo(access_token));
          const u = await apiGetUserInfo(access_token)
        
          if(u){
            console.log(u)
            dispatch(saveUserInfo(u))
          }
        }
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <AppRouter />
      </Router>
    </ThemeProvider>
  );
}

export default App;
