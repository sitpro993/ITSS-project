import { Toolbar } from '@mui/material'
import React from 'react'
import NavBar from '../../components/NavBar'
import RegisteredStudentList from '../../containers/registeredStudents'

export default function RegisteredStudentsPage() {
  return (
    <div>
        <NavBar />
        <Toolbar />
        <RegisteredStudentList />
    </div>
  )
}
