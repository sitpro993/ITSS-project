import { Button, CircularProgress, Container, Grid, TextField, Typography, Stack } from "@mui/material";
import React, { useEffect , useState} from "react";
import { useForm, useWatch } from "react-hook-form";
import { getStudentProfile, updateStudentProfile } from "../../apis/student";
import { toast } from "react-toastify";

export default function Profile() {
  const [data, setData] = useState()
  const [loading, setloading] = useState(true)

  useEffect(async() => {
    const response = await getStudentProfile()
    console.log(response.data);
    setData(response.data)
    setloading(false)
  },[])

  const handleChange = (event,type) => {
    setData({...data, [type]: event.target.value})
    console.log(data);
  }
  const handleSubmit = async(event) => {
    event.preventDefault()
    const response = await updateStudentProfile(data)
    if (!response.data.err)
      toast.success(response.msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

  }
  
  if (loading)
    return <CircularProgress></CircularProgress>
  else
  return <Container component = "form" onSubmit = {handleSubmit}>
    <Typography sx = {{ mt: 2, mb: 3}} variant = "h2" align="center"> Student Profile</Typography>
    <Grid container  rowSpacing={2} columnSpacing = {2} alignItems="center" justifyContent="flex-end">
      <Grid item xs = {12} md = {2}>
        <Typography variant = "h6" >First Name </Typography>
      </Grid>
      <Grid item xs = {12} md = {4}>
        <TextField label="First Name" variant="outlined" required defaultValue= {data.firstName} onChange={(event)=> handleChange(event, 'firstName')} fullWidth/>
      </Grid>
      <Grid item xs = {12} md = {2}>
        <Typography variant = "h6">Last Name </Typography>
      </Grid>
      <Grid item xs = {12} md = {4}>
        <TextField id="outlined-basic" label="Last Name" variant="outlined" required defaultValue= {data.lastName} onChange={(event)=> handleChange(event, 'lastName')} fullWidth/>
      </Grid>
      <Grid item xs = {12} md = {2}>
        <Typography variant = "h6"> Age </Typography>
      </Grid>
      <Grid item xs = {12} md = {3}>
        <TextField id="outlined-basic" type = "number" label="Age" variant="outlined" defaultValue= {data.age} onChange={(event)=> handleChange(event, 'age')}  fullWidth/>
      </Grid>
      <Grid item xs = {12} md = {7}>
        
      </Grid>
      <Grid item xs = {12} md = {2}>
        <Typography variant = "h6">Address </Typography>
      </Grid>
      <Grid item xs = {12} md = {10}>
        <TextField id="outlined-basic" label="Address" variant="outlined" defaultValue= {data.address} onChange={(event)=> handleChange(event, 'address')} fullWidth/>
      </Grid>
      <Grid item xs = {12} md = {2}>
        <Typography variant = "h6" > Phone </Typography>
      </Grid>
      <Grid item xs = {12} md = {10}>
        <TextField id="outlined-basic" defaultValue= {data.phone} onChange={(event)=> handleChange(event, 'phone')}  label="Phone" variant="outlined" fullWidth/>
      </Grid>
      <Grid item xs = {12} md = {2}>
        <Typography variant = "h6" > CPA </Typography>
      </Grid>
      <Grid item xs = {12} md = {10}>
        <TextField id="outlined-basic" label="CPA" step="any" InputProps={{ inputProps: { min: 0, max: 4 } }}  defaultValue= {data.CPA} onChange={(event)=> handleChange(event, 'CPA')} variant="outlined" fullWidth/>
      </Grid>
      <Grid item xs = {12} md = {2}>
        <Typography variant = "h6" > Available time </Typography>
      </Grid>
      <Grid item xs = {12} md = {10}>
        <TextField id="outlined-basic" label="Available time" variant="outlined"  defaultValue= {data.availableTime} onChange={(event)=> handleChange(event, 'availableTime')}  fullWidth/>
      </Grid>
      <Grid item xs = {12} md = {2}>
        <Typography variant = "h6" > Achievement </Typography>
      </Grid>
      <Grid item xs = {12} md = {10}>
        <TextField multiline rows = {4} id="outlined-basic" label="Achievement" variant="outlined" defaultValue= {data.achievement} onChange={(event)=> handleChange(event, 'achievement')}  fullWidth/>
      </Grid>
      <Grid item xs = {12} md = {2}>
        <Typography variant = "h6" > Strength </Typography>
      </Grid>
      <Grid item xs = {12} md = {10}>
        <TextField multiline rows = {3} id="outlined-basic" label="Strength" defaultValue= {data.strength} onChange={(event)=> handleChange(event, 'strength')} variant="outlined" fullWidth/>
      </Grid>
      <Grid item xs = {12} md = {2}>
        <Typography variant = "h6" > Weakness </Typography>
      </Grid>
      <Grid item xs = {12} md = {10}>
        <TextField multiline rows = {3} id="outlined-basic"label="Weakness" defaultValue= {data.weakness} onChange={(event)=> handleChange(event, 'weakness')} variant="outlined" fullWidth/>
      </Grid>
    </Grid>
    <Stack>
    <Button sx ={{m : 4}} size = "medium" type = 'submit' variant = "contained"> Submit </Button>

    </Stack>
  </Container>
}
