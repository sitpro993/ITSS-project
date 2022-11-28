import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiStudentRegister } from "../../../../apis/auth";
import { REGEX_EMAIL } from "../../../../constant/regex";
import { useStyles } from "./index.css";

function CompanyRegisterForm() {
  const classes = useStyles({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const response = await apiStudentRegister({
      fullName: data.fullName,
      shortName: data.shortName,
      email: data.email,
      password: data.password,
      role: "company",
    });
    if (response) {
      navigate("/login");
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={classes.form}
      sx={{ px: 4, py: 6 }}
    >
      <FormControl fullWidth required sx={{ mb: 2 }}>
        <InputLabel htmlFor="register-email">Fullname</InputLabel>

        <OutlinedInput
          id="register-fullname"
          {...register("fullName", {
            required: "Fullname is required",
          })}
          label="Fullname"
          error={!!errors["fullname"]}
        />
        <FormHelperText error={!!errors["fullname"]}>
          {errors["fullname"] ? errors["fullname"].message : ""}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth required sx={{ mb: 2 }}>
        <InputLabel htmlFor="register-email">Shortname</InputLabel>

        <OutlinedInput
          id="register-shortname"
          {...register("shortName", {
            required: "Shortname is required",
          })}
          label="Shortname"
          error={!!errors["shortname"]}
        />
        <FormHelperText error={!!errors["shortname"]}>
          {errors["shortname"] ? errors["shortname"].message : ""}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth required sx={{ mb: 2 }}>
        <InputLabel htmlFor="register-email">Email</InputLabel>

        <OutlinedInput
          id="register-email"
          {...register("email", {
            required: "Email is required field",
            pattern: {
              value: REGEX_EMAIL,
              message: "Invalid email address",
            },
          })}
          label="Email"
          error={!!errors["email"]}
        />
        <FormHelperText error={!!errors["email"]}>
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
          id="register-confirm-password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (val) => {
              if (watch("password") !== val) {
                return "Password and confirm password are not the same";
              }
            },
          })}
          type={showConfirmPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm password"
          error={!!errors["confirmPassword"]}
        />
        <FormHelperText error={!!errors["confirmPassword"]}>
          {errors["confirmPassword"] ? errors["confirmPassword"].message : ""}
        </FormHelperText>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>
    </Box>
  );
}

export default CompanyRegisterForm;
