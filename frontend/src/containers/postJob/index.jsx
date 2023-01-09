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
            Đăng công việc
          </Typography>
        </Stack>
        <Divider />
        <Box component="form" mt={3} mx={8} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6} mb={6}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Tên công việc"
                  variant="outlined"
                  {...register("name", {
                    required: "Tên công việc không được để trống",
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
                <InputLabel id="postJob-type">Loại công việc</InputLabel>
                <Select
                  labelId="postJob-type"
                  label="Loại công việc"
                  {...register("type", {
                    required: "Loại công việc không được để trống",
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
                <InputLabel id="working-form">Hình thức làm việc</InputLabel>
                <Select
                  labelId="working-form"
                  label="Hình thức làm việc"
                  {...register("workingForm", {
                    required: "Hình thức làm việc không được để trống",
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
                <InputLabel id="internship-time">Thời gian thực tâp</InputLabel>
                <Select
                  labelId="internship-time"
                  label="Thời gian thực tâp"
                  {...register("internshipTime", {
                    required: "Thời gian thực tập không được để trống",
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
                  label="Mức lương"
                  variant="outlined"
                  {...register("salary", {
                    required: "Mức lương không được để trống",
                    pattern: {
                      value: /^\d*(\.\d+)?$/,
                      message: "Request is digits",
                    },
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">VNĐ</InputAdornment>
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
                  label="Kĩ năng cần có"
                  variant="outlined"
                  {...register("required", {
                    required: "Kĩ năng cần có không được để trống",
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
                  label="Lợi ích"
                  variant="outlined"
                  {...register("benefit", {
                    required: "Lợi ích không được để trống",
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
                  label="Mô tả công việc"
                  variant="outlined"
                  {...register("description", {
                    required: "Mô tả công việc không được để trống",
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
              Đăng công việc
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default PostJob;
