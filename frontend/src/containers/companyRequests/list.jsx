import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Paper, TableContainer, Typography } from '@mui/material';
import { convertDateToFormat } from './helper';

export default function Requests({ requests, loading }) {
  return loading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px',
      }}
    >
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
      <Typography variant="h2" style={{ color: '#7ABACC' }}>
        Yêu Cầu Của Bạn
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>
                {/* Company Name */}
                Tên Công Ty
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>
                {/* Position Name */}
                Tên Vị Trí
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>
                {/* Request */}
                Yêu Cầu
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>
                {/* Working Type */}
                Loại Công Việc
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>
                {/* Date */}
                Ngày Tạo
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                {/* Status */}
                Trạng Thái
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests?.map((row) => (
              <TableRow key={row?._id}>
                <TableCell>{row?.position?.company?.full_name}</TableCell>
                <TableCell>{row?.position?.name}</TableCell>
                <TableCell>{row?.request}</TableCell>
                <TableCell>{row?.working_type}</TableCell>
                <TableCell>{convertDateToFormat(row?.createdAt)}</TableCell>
                <TableCell align="right">{row?.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
