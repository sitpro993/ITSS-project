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

  const types = [
    { id: "part time", name: "Part time" },
    { id: "full time", name: "Full time" },
    { id: "both", name: "Both" },

  ];

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
          <Typography variant="h3" align="center" justifyContent="center">
            Post Job
          </Typography>
        </Stack>
        <Divider />
        <Box component="form" mt={3} mx={8} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6} mb={6}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Title Job"
                  variant="outlined"
                  {...register("name", {
                    required: "Required field",
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
                <InputLabel id="postJob-type">Type</InputLabel>
                <Select
                  labelId="postJob-type"
                  label="Type"
                  {...register("type", {
                    required: "Required field",
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
          </Grid>
          <Grid container spacing={6} mb={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  label="Enter salary"
                  variant="outlined"
                  {...register("salary", {
                    required: "Required field",
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

            {/* <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  label="Required employees"
                  variant="outlined"
                  {...register("required_employees", {
                    required: "Required field",
                    pattern: {
                      value: /^\d*(\.\d+)?$/,
                      message: "Request is digits",
                    },
                  })}
                  error={!!errors["required_employees"]}
                />
                <FormHelperText error={!!errors["required_employees"]}>
                  {errors["required_employees"]
                    ? errors["required_employees"].message
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid> */}
          </Grid>

          <Grid container spacing={6} mb={6}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Enter skill requirements"
                  variant="outlined"
                  {...register("required", {
                    required: "Required field",
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
                  label="Enter the job benefit"
                  variant="outlined"
                  {...register("benefit", {
                    required: "Required field",
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
                  label="Enter the job description"
                  variant="outlined"
                  {...register("description", {
                    required: "Required field",
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
              Submit
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default PostJob;
