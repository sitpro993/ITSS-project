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

function ApplyInternship() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: "",
      position: "",
      type: "",
      working_type: "",
      request: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };
  const companies = [
    { id: 1, name: "Shoppe" },
    { id: 2, name: "Facebook" },
    { id: 3, name: " Google" },
  ];
  const positions = [
    { id: 1, name: "Software Engineer" },
    { id: 2, name: "IT Consultant" },
    { id: 3, name: "Marketing Manager" },
  ];
  const types = [
    { id: 1, name: "Learning" },
    { id: 2, name: "Training on Job" },
  ];
  const working_types = [
    { id: 1, name: "Online" },
    { id: 2, name: "Offline" },
    { id: 3, name: "Both" },
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
            Apply For Internship
          </Typography>
        </Stack>
        <Divider />
        <Box component="form" mt={3} mx={8} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6} mb={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="apply-company">Company</InputLabel>
                <Select
                  labelId="apply-company"
                  label="Company"
                  {...register("company", {
                    required: "Required field",
                  })}
                  error={!!errors["company"]}
                >
                  {companies.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors["company"]}>
                  {errors["company"] ? errors["company"].message : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="apply-position">Position</InputLabel>
                <Select
                  labelId="apply-position"
                  label="Position"
                  {...register("position", {
                    required: "Required field",
                  })}
                  error={!!errors["position"]}
                >
                  {positions.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors["position"]}>
                  {errors["position"] ? errors["position"].message : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={6} mb={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="apply-type">Type</InputLabel>
                <Select
                  labelId="apply-type"
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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="apply-working_type">Working type</InputLabel>
                <Select
                  labelId="apply-working_type"
                  label="Working type"
                  {...register("working_type", {
                    required: "Required field",
                  })}
                  error={!!errors["working_type"]}
                >
                  {working_types.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors["working_type"]}>
                  {errors["working_type"] ? errors["working_type"].message : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={6} mb={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  label="Your request to company"
                  variant="outlined"
                  {...register("request", {
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
                  error={!!errors["request"]}
                />
                <FormHelperText error={!!errors["request"]}>
                  {errors["request"] ? errors["request"].message : ""}
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

export default ApplyInternship;
