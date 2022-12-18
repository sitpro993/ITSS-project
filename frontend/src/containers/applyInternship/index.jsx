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
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { getListCompany } from "../../apis/company";
import { apiApplyInternship } from "../../apis/job";
import { getPositionByCompany } from "../../apis/position";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";

const useGetCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      const response = await getListCompany();
      if (response && response.data) {
        setCompanies(response.data);
      }
    };
    getCompanies();
  }, []);
  return companies;
};

function ApplyInternship() {
  const userInfo = useSelector((s) => s.auth.user);
  const companies = useGetCompanies();
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: "",
      position: "",
      working_type: "",
      request: "",
    },
  });

  const companyId = useWatch({ control, name: "company" });
  useEffect(() => {
    const getPosition = async () => {
      if (companies && companyId) {
        const response = await getPositionByCompany(companyId);
        if (response && response.data) {
          setPositions(response.data);
        }
      }
    };
    getPosition();
  }, [companyId, companies]);

  const onSubmit = async (data) => {
    const response = await apiApplyInternship({
      request: data.request,
      working_type: data.working_type,
      company: data.company,
      position: data.position,
      student: userInfo._id,
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
      navigate(ROUTE.COMPANY_REQUESTS);
    }
  };

  const working_types = [
    { id: "online", name: "Online" },
    { id: "offline", name: "Offline" },
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
                  {companies &&
                    companies.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.short_name}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText error={!!errors["company"]}>
                  {errors["company"] ? errors["company"].message : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            {companyId && (
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
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={!!errors["position"]}>
                    {errors["position"] ? errors["position"].message : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
            )}
          </Grid>
          <Grid container spacing={6} mb={6}>
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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Enter request"
                  variant="outlined"
                  {...register("request")}
                  multiline
                  rows={4}
                />
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
