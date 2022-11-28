import React, { useState } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useStyles } from "./index.css";
import StudentRegisterForm from "./form/student";
import CompanyRegisterForm from "./form/company";
function Register() {
  const classes = useStyles({});
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Grid container className={classes.registerPage}>
      <Grid item lg={6} md={10} sx={{ margin: "auto" }}>
        <Grid
          container
          style={{
            background: "#fff",
            boxShadow: "0 10px 34px -15px rgb(0 0 0 / 24%)",
          }}
        >
          <Grid item xs={6} className={classes.intro}></Grid>
          <Grid item xs={6}>
            <Box>
              <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="Student" />
                <Tab label="Company" />
              </Tabs>
            </Box>
            <Box sx={{ padding: 2 }}>
              {tabIndex === 0 && (
                <Box>
                  <StudentRegisterForm />
                </Box>
              )}
              {tabIndex === 1 && (
                <Box>
                  <CompanyRegisterForm />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Register;
