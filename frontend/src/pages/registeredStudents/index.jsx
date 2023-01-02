import { Toolbar, Typography } from "@mui/material";
import React from "react";
import NavBar from "../../components/NavBar";
import RegisteredStudentList from "../../containers/registeredStudents";

export default function RegisteredStudentsPage() {
  return (
    <div>
      <Toolbar />
      <Typography variant="h1" component="h3" align="center">
        Danh sách đăng ký
      </Typography>
      <RegisteredStudentList />
    </div>
  );
}
