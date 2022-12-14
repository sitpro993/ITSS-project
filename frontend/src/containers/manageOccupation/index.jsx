import { Box, Button, Container, Toolbar, Typography, IconButton, TableContainer, Paper } from '@mui/material'
import React from 'react'
import Sidebar from '../../components/Sidebar'
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const drawerWidth = 240;
const rows = [
    {
        id: 1, 
        index: 1,
        title: 'Software engineer',
        description: 'Some description about software engineer will be written here ! ',
        video_link: 'wwww.youtube.com'
    }
]
const columns = [
    {
      field: 'index',
      headerName: 'STT',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 50,
    },
    {
      field: 'title',
      headerName: 'Tên nghề nghiệp ',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 300,
    },
    {
        field: 'video_link',
        headerName: 'Link video',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 200,
    },
    {
      field: 'action1',
      headerName: '',
      width: 60,
      sortable: false,
      disableClickEventBubbling: true,
      
      renderCell: (params) => {
          const onClick = (e) => {
            const currentRow = params.row;
            console.log(currentRow);
            // handleEdit(currentRow.id)
          };
          
          return (
            <>
               <IconButton onClick={onClick}>
                <EditIcon/>
              </IconButton>
            </>
          );
      },
    },
    {
      field: 'action2',
      headerName: '',
      width: 70,
      sortable: false,
      disableClickEventBubbling: true,
      
      renderCell: (params) => {
            const onClick = (e) => {
            const currentRow = params.row;
            // handleDelete(currentRow.id)
            // return alert(JSON.stringify(currentRow, null, 4));
          };
          
          return (
            <>
               <IconButton onClick={onClick}>
                <DeleteIcon/>
              </IconButton>
            </>
          );
      }
    }

  ];
function ManageOccupation() {
  return (
    <Box sx={{ display: 'flex' }}>
        <Sidebar></Sidebar>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar />
            <Typography variant = "h3" gutterBottom sx ={{mb: 3}}> Manage occupation </Typography>
            <Button variant = "contained"> Add occupation </Button>
            

            <TableContainer component = {Paper} sx = {{mt: 3}} >
                <Box
                    sx={{
                        height: 500,
                        width: '100%',
                        backgroundColor : 'white',
                        '& .super-app-theme--header': {
                        // backgroundColor: '#a4cde0',
                        },
                    }}
                    >
                    <DataGrid rows={rows} columns={columns}  pageSize ={5} rowsPerPageOptions={[5]} disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }} sx ={{padding: 2}}/>
                </Box>
            </TableContainer>
        </Box>
    </Box>
  )
}

export default ManageOccupation