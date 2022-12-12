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
import { useForm, Controller } from "react-hook-form";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { isFuture } from "date-fns";

function PostJob() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      salary: "",
      type: "",
      working_type: "",
      required: "",
      benefit: "",
      description: "",
      slot: "",
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
                  {...register("title", {
                    required: "Required field",
                  })}
                  error={!!errors["title"]}
                />
                <FormHelperText error={!!errors["title"]}>
                  {errors["title"] ? errors["title"].message : ""}
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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="postJob-working_type">Working type</InputLabel>
                <Select
                  labelId="postJob-working_type"
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

            {/* <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  control={control}
                  name="dateline"
                  rules={{
                    validate: {
                      min: (date) =>
                        isFuture(date) || "Please, enter a future date",
                    },
                  }}
                  render={({
                    field: { ref, onBlur, name, ...field },
                    fieldState,
                  }) => (
                    <DatePicker
                      {...field}
                      inputRef={ref}
                      label="Dateline"
                      renderInput={(inputProps) => (
                        <TextField
                          {...inputProps}
                          onBlur={onBlur}
                          name={name}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid> */}

            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  label="Required employees"
                  variant="outlined"
                  {...register("slot", {
                    required: "Required field",
                    pattern: {
                      value: /^\d*(\.\d+)?$/,
                      message: "Request is digits",
                    },
                  })}
                  error={!!errors["slot"]}
                />
                <FormHelperText error={!!errors["slot"]}>
                  {errors["slot"] ? errors["slot"].message : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
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
