import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "./index.css";
import { apiRegister } from "../../apis/auth";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/slices/authSlice";

const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Register() {
  const classes = useStyles({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const response = await apiRegister({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    });
    if (response) {
      navigate("/login");
    }
  };
  return (
    <Grid container className={classes.registerPage}>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={6} className={classes.intro}></Grid>
          <Grid item xs={6}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className={classes.form}
            >
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel htmlFor="register-email">Firstname</InputLabel>

                <OutlinedInput
                  id="register-firstname"
                  {...register("firstname", {
                    required: "Required field",
                  })}
                  label="Firstname"
                  error={!!errors["firstname"]}
                />
                <FormHelperText
                  error={!!errors["firstname"]}
                  id="outlined-weight-helper-text"
                >
                  {errors["firstname"] ? errors["firstname"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel htmlFor="register-email">Lastname</InputLabel>

                <OutlinedInput
                  id="register-lastname"
                  {...register("lastname", {
                    required: "Required field",
                  })}
                  label="Lastname"
                  error={!!errors["lastname"]}
                />
                <FormHelperText
                  error={!!errors["lastname"]}
                  id="outlined-weight-helper-text"
                >
                  {errors["lastname"] ? errors["lastname"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel htmlFor="register-email">Email</InputLabel>

                <OutlinedInput
                  id="register-email"
                  {...register("email", {
                    required: "Required field",
                    pattern: {
                      value: REGEX_EMAIL,
                      message: "Invalid email address",
                    },
                  })}
                  label="Email"
                  error={!!errors["email"]}
                />
                <FormHelperText
                  error={!!errors["email"]}
                  id="outlined-weight-helper-text"
                >
                  {errors["email"] ? errors["email"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel htmlFor="register-password">Password</InputLabel>
                <OutlinedInput
                  id="register-password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  error={!!errors["password"]}
                />
                <FormHelperText error={!!errors["password"]}>
                  {errors["password"] ? errors["password"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel htmlFor="register-confirm-password">
                  Confirm password
                </InputLabel>
                <OutlinedInput
                  id="register-password"
                  {...register("confirmPassword", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm password"
                  error={!!errors["password"]}
                />
                <FormHelperText error={!!errors["password"]}>
                  {errors["password"] ? errors["password"].message : ""}
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to={"/login"}>Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to={"/login"}>Don't have an account? Sign Up</Link>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Register;
