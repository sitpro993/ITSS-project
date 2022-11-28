import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "./index.css";
import { apiLogin } from "../../apis/auth";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/slices/authSlice";
import { REGEX_EMAIL } from "../../constant/regex";

function Login() {
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
    const response = await apiLogin(data);

    if (response && response.userInfo) {
      dispatch(
        loginAction({
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          userInfo: response.userInfo,
          role: response.role,
        })
      );
      navigate("/");
    }
  };
  return (
    <Grid container className={classes.loginPage}>
      <Grid item lg={6} md={10} sx={{ margin: "auto" }}>
        <Grid
          container
          style={{
            background: "#fff",
            boxShadow: "0 10px 34px -15px rgb(0 0 0 / 24%)",
          }}
        >
          <Grid item xs={6} className={classes.intro}></Grid>
          <Grid item xs={6}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className={classes.form}
              sx={{ px: 4, py: 6 }}
            >
              <FormControl fullWidth required sx={{ mb: 3 }}>
                <InputLabel htmlFor="login-email">Email</InputLabel>

                <OutlinedInput
                  id="login-email"
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
              <FormControl fullWidth required sx={{ mb: 3 }}>
                <InputLabel htmlFor="login-password">Password</InputLabel>
                <OutlinedInput
                  id="login-password"
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link>
                    <Typography variant="body1">
                      Don't have an account? Sign Up
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
