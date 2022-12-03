import { Button, Container, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select, Stack, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@mui/material'
import React from 'react'
import NavBar from '../../components/NavBar'

function ApplyJob() {
  const [internInfo, setInternInfo] = React.useState({
    company: '',
    position: '',
    type: '',
    working_type: '',
    request: ''
  });

  const handleChange = (event, type) => {
    setInternInfo({...internInfo, [type]: event.target.value})
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const companies = ['Shopee',' Facebook',' Google']
  const positions= ['Software Engineer', 'IT Consultant', 'Marketing Manager']
  const types = ['Learning', 'Training on Job']
  const working_types = ['Online', 'Offline', 'Both']
  return (
    <>
    <NavBar/>
    <Container sx = {{mt : 3, pt: 2, pb: 3}} style={{ background: "#fff", boxShadow: "0 10px 34px -15px rgb(0 0 0 / 24%)",}}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={4} sx ={{p: 2,mb:1}} >
        <Typography variant = "h3" align = "center" justifyContent = 'center'> Apply For Internship</Typography> 
      </Stack>
      <Divider/>
      <FormControl  sx={{ m: 1, mt: 3, pl: 10, width: 1000 }}>
          <Typography variant = "subtitle1" gutterBottom> Company</Typography>
          <Select displayEmpty value = {internInfo.company}  label = "Select company"  onChange={(event)=> handleChange(event, 'company')}>
            {
              companies.map((item) => (
                <MenuItem value = {item} >
                  {item}
                </MenuItem>
              ))
            }
            </Select>
      </FormControl>
      <FormControl sx={{ m: 1, mt: 3, pl: 10, width: 500 }}>
        <Typography variant = "subtitle1" gutterBottom> Position </Typography>
        <Select displayEmpty value = {internInfo.position}  label = "Select position"  onChange={(event)=> handleChange(event, 'position')}>
          {
            positions.map((item) => (
              <MenuItem value = {item} >
                {item}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, mt: 3, pl: 10, width: 500 }}>
        <Typography variant = "subtitle1" gutterBottom> Type </Typography>
        <Select displayEmpty value = {internInfo.type}  label = "Select company"  onChange={(event)=> handleChange(event, 'type')}>
        {
            types.map((item) => (
              <MenuItem value = {item} >
                {item}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, mt: 3, pl: 10, width: 500 }}>
        <Typography variant = "subtitle1" gutterBottom> Working type </Typography>
        <Select displayEmpty value = {internInfo.working_type}  label = "Select company"  onChange={(event)=> handleChange(event, 'working_type')}>
        {
            working_types.map((item) => (
              <MenuItem value = {item} >
                {item}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl  sx={{ m: 1, mt: 3,mb: 3, pl: 10, width: 1000 }}>
          <Typography variant = "subtitle1" gutterBottom> Your request to company</Typography>
          <TextField fullWidth  label="Enter your request" variant="outlined" multiline
          rows={4} />
      </FormControl>
      <Stack justifyContent="center" alignItems="center">
        <Button variant ="contained" sx = {{pl: 4, pr: 4}} onClick={handleClickOpen} >Submit</Button>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm your application"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to apply your internship form ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Not yet </Button>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      
    </Container>
   
    </>
  )
}

export default ApplyJob