import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
      <React.Fragment>
        <h1>Your Requests</h1>
        <Table size="medium" style={{ maxWidth: '1280px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Request</TableCell>
              <TableCell>Working Type</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests?.map((row) => (
              <TableRow key={row?.id}>
                <TableCell>{row?.date}</TableCell>
                <TableCell>{row?.company}</TableCell>
                <TableCell>{row?.type}</TableCell>
                <TableCell>{row?.request}</TableCell>
                <TableCell>{row?.workingType}</TableCell>
                <TableCell align="right">{row?.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </div>
  );
}
