import { Box, Button, Container, Toolbar, Typography, IconButton, TableContainer, Paper, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getOccupation } from '../../apis/occupation';
import { useState } from 'react';
import { letterSpacing } from '@mui/system';
import FormDialog from './FormDialog';
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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [occupations, setOccupations] = useState()
  const accessToken = localStorage.getItem('')


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(async() => {
    let response = await getOccupation(accessToken)
    console.log(response.data);
    let temp = response.data.map((item)=>  ({...item, id: item._id}))
    console.log(temp);
    setOccupations(temp)
    setLoading(false)
  }, [])
  if (loading)
  return <CircularProgress/>
  else
  return (
    <Box sx={{ display: 'flex' }}>
        <Sidebar></Sidebar>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar />
            <Typography variant = "h3" gutterBottom sx ={{mb: 3}}> Manage occupation </Typography>
            <Button variant = "contained" onClick={handleClickOpen}> Add new occupation </Button>
            

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
                    <DataGrid rows={occupations} columns={columns}  pageSize ={5} rowsPerPageOptions={[5]} disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }} sx ={{padding: 2}}/>
                </Box>
            </TableContainer>
            <FormDialog open = {open} handleClose = {handleClose}/>
        </Box>
    </Box>
  )
}

export default ManageOccupation