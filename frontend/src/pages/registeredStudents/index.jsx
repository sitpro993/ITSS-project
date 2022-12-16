import { Toolbar, Typography } from "@mui/material";
import React from "react";
import NavBar from "../../components/NavBar";
import RegisteredStudentList from "../../containers/registeredStudents";

export default function RegisteredStudentsPage() {
  return (
    <div>
      <Toolbar />
      <Typography variant="h2" component="h3" align="center">
        Subscriber List
      </Typography>
      <RegisteredStudentList />
    </div>
  );
}
