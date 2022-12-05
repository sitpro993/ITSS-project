import { useEffect } from "react";
import { CompanyItem } from "./companyItem";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector, useDispatch } from "react-redux";
import { selectCompanyList } from "../../redux/selector/companySelector";
import { fetchCompanys } from "../../redux/thunks/companyThunk";

export const Company = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectCompanyList);

  useEffect(() => {
    dispatch(fetchCompanys({ page: 1, size: 8 }));
  }, [dispatch]);

  const handleChangePage = (_, value) => {
    dispatch(fetchCompanys({ page: value, size: 8 }));
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "1280px", padding: "20px" }}>
      <h1>Top Company</h1>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data?.map((company) => (
          <Grid xs={2} sm={4} md={3} key={company.id}>
            <CompanyItem company={company} loading={loading} />
          </Grid>
        ))}
      </Grid>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Pagination count={10} color="primary" onChange={handleChangePage} />
      </div>
    </Box>
  );
};
