import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { createTheme, CssBaseline, responsiveFontSizes } from "@mui/material";
import AppRouter from "./routes";
import { custormTheme } from "./config/theme";
import { ToastContainer } from "react-toastify";
function App() {
  const theme = responsiveFontSizes(createTheme({ ...custormTheme }));

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
