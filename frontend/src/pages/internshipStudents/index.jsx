
import { Toolbar, Typography } from "@mui/material";
import React from "react";
import IntershipStudentList from "../../containers/internshipStudents";

export default function InternshipStudentsPage() {
  return (
    <div>
      <Toolbar />
      <Typography variant="h1" component="h3" align="center">
        Danh sách thực tập sinh
      </Typography>
      <IntershipStudentList />
    </div>
  );
}
