import {
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Box,
  Grid,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { registerJob } from "../../apis/position";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import {
  internshipTimeList,
  types,
  workingFormList,
} from "../../constant/list";

function PostJob() {
  const userInfo = useSelector((s) => s.auth.user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      salary: "",
      type: "",
      required: "",
      benefit: "",
      description: "",
      required_employees: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await registerJob({
      name: data.name,
      salary: data.salary,
      type: data.type,
      benefit: data.benefit,
      required_skills: data.required,
      working_form: data.workingForm,
      internship_time: data.internshipTime,
      // required_employees: data.required_employees,
      description: data.description,
      company: userInfo._id,
    });

    if (response && response.msg) {
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
      navigate(ROUTE.STUDENT_REQUESTS);
    }
  };

  return (
    <>
      <Container
        sx={{ mt: 3, pt: 2, pb: 3 }}
        style={{
          background: "#fff",
          boxShadow: "0 10px 34px -15px rgb(0 0 0 / 24%)",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          sx={{ p: 2, mb: 1, mx: 8 }}
        >
          <Typography variant="h3" align="center" justifyContent="center" sx={{color: '#7ABACC'}}>
            ????ng c??ng vi???c
          </Typography>
        </Stack>
        <Divider />
        <Box component="form" mt={3} mx={8} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6} mb={6}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="T??n c??ng vi???c"
                  variant="outlined"
                  {...register("name", {
                    required: "T??n c??ng vi???c kh??ng ???????c ????? tr???ng",
                  })}
                  error={!!errors["name"]}
                />
                <FormHelperText error={!!errors["name"]}>
                  {errors["name"] ? errors["name"].message : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={6} mb={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="postJob-type">Lo???i c??ng vi???c</InputLabel>
                <Select
                  labelId="postJob-type"
                  label="Lo???i c??ng vi???c"
                  {...register("type", {
                    required: "Lo???i c??ng vi???c kh??ng ???????c ????? tr???ng",
                  })}
                  error={!!errors["type"]}
                >
                  {types.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors["type"]}>
                  {errors["type"] ? errors["type"].message : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="working-form">H??nh th???c l??m vi???c</InputLabel>
                <Select
                  labelId="working-form"
                  label="H??nh th???c l??m vi???c"
                  {...register("workingForm", {
                    required: "H??nh th???c l??m vi???c kh??ng ???????c ????? tr???ng",
                  })}
                  error={!!errors["workingForm"]}
                >
                  {workingFormList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors["workingForm"]}>
                  {errors["workingForm"] ? errors["workingForm"].message : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={6} mb={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="internship-time">Th???i gian th???c t??p</InputLabel>
                <Select
                  labelId="internship-time"
                  label="Th???i gian th???c t??p"
                  {...register("internshipTime", {
                    required: "Th???i gian th???c t???p kh??ng ???????c ????? tr???ng",
                  })}
                  error={!!errors["internshipTime"]}
                >
                  {internshipTimeList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors["internshipTime"]}>
                  {errors["internshipTime"]
                    ? errors["internshipTime"].message
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  label="M???c l????ng"
                  variant="outlined"
                  {...register("salary", {
                    required: "M???c l????ng kh??ng ???????c ????? tr???ng",
                    pattern: {
                      value: /^\d*(\.\d+)?$/,
                      message: "Request is digits",
                    },
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">VN??</InputAdornment>
                    ),
                  }}
                  error={!!errors["salary"]}
                />
                <FormHelperText error={!!errors["salary"]}>
                  {errors["salary"] ? errors["salary"].message : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={6} mb={6}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="K?? n??ng c???n c??"
                  variant="outlined"
                  {...register("required", {
                    required: "K?? n??ng c???n c?? kh??ng ???????c ????? tr???ng",
                  })}
                  error={!!errors["required"]}
                  multiline
                  rows={4}
                />
                <FormHelperText error={!!errors["required"]}>
                  {errors["required"] ? errors["required"].message : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={6} mb={6}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="L???i ??ch"
                  variant="outlined"
                  {...register("benefit", {
                    required: "L???i ??ch kh??ng ???????c ????? tr???ng",
                  })}
                  error={!!errors["benefit"]}
                  multiline
                  rows={4}
                />
                <FormHelperText error={!!errors["benefit"]}>
                  {errors["benefit"] ? errors["benefit"].message : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={6} mb={6}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="M?? t??? c??ng vi???c"
                  variant="outlined"
                  {...register("description", {
                    required: "M?? t??? c??ng vi???c kh??ng ???????c ????? tr???ng",
                  })}
                  error={!!errors["description"]}
                  multiline
                  rows={4}
                />
                <FormHelperText error={!!errors["description"]}>
                  {errors["description"] ? errors["description"].message : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Stack justifyContent="center" alignItems="center">
            <Button variant="contained" sx={{ pl: 4, pr: 4 }} type="submit">
              ????ng c??ng vi???c
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default PostJob;
