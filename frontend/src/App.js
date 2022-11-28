import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { createTheme, CssBaseline, responsiveFontSizes } from "@mui/material";
import AppRouter from "./routes";
import { custormTheme } from "./config/theme";
function App() {
  const theme = responsiveFontSizes(createTheme({ ...custormTheme }));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Router>
        <AppRouter />
      </Router>
    </ThemeProvider>
  );
}

export default App;
