import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Paper, TableContainer, Typography } from '@mui/material';

export default function Requests({ requests, loading }) {
  return loading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
      <CircularProgress />
    </Box>
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30px',
      }}
    >
        <h1>Your Requests</h1>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 700}}> Company Name</TableCell>
              <TableCell sx={{fontWeight: 700}}>Type</TableCell>
              <TableCell sx={{fontWeight: 700}}>Request</TableCell>
              <TableCell sx={{fontWeight: 700}}>Working Type</TableCell>
              <TableCell sx={{fontWeight: 700}}>Date</TableCell>
              <TableCell sx={{fontWeight: 700}} align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests?.map((row) => (
              <TableRow key={row?.id}>
                <TableCell>{row?.company}</TableCell>
                <TableCell>{row?.type}</TableCell>
                <TableCell>{row?.request}</TableCell>
                <TableCell>{row?.workingType}</TableCell>
                <TableCell>{row?.date}</TableCell>
                <TableCell align="right">{row?.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
  
    </div>
  );
}
