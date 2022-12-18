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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "./index.css";
import { apiGetUserInfo, apiLogin } from "../../apis/auth";
import { useDispatch, useSelector } from "react-redux";
import { REGEX_EMAIL } from "../../constant/regex";
import { toast } from "react-toastify";
import {
  clearData,
  saveAccessToken,
  saveUserInfo,
} from "../../redux/slices/authSlice";
import { setLocalStorageItem } from "../../config/localStorage";
import { ROUTE } from "../../constant/route";

function Login() {
  const classes = useStyles({});
  const [showPassword, setShowPassword] = useState(false);
  const userInfo = useSelector((s) => s.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearData());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const response = await apiLogin(data);

    if (response && response.access_token) {
      dispatch(saveAccessToken(response.access_token));
      await setLocalStorageItem("accessToken", response.access_token);
      const userInfo = await apiGetUserInfo(response.access_token);

      if (userInfo) {
        dispatch(saveUserInfo(userInfo));
        toast.success("Login success", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        if (userInfo.role === "company") {
          navigate(ROUTE.STUDENT_REQUESTS);
        } else {
          navigate(ROUTE.COMPANY);
        }
      }
    }
    if (response && response.err) {
      toast.error(response.err, {
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
                  <Link to="/register">
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
