import { useEffect, useMemo } from 'react';
import { CompanyItem } from './companyItem';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectCompanyList } from '../../redux/selector/companySelector';
import { fetchCompanys } from '../../redux/thunks/companyThunk';
import { PAGINATION_SIZE } from './const';
import { useState } from 'react';
import { debounce } from 'lodash';
import { Typography } from '@mui/material';

export const Company = () => {
  const dispatch = useDispatch();
  const { data, loading, total } = useSelector(selectCompanyList);
  const [searchKey, setSearchKey] = useState('');
  const debouncedSearch = debounce(setSearchKey, 500);

  const totalPage = useMemo(() => {
    return Math.ceil(total / PAGINATION_SIZE);
  }, [total]);

  const handleChangePage = (_, value) => {
    dispatch(
      fetchCompanys({
        page: value,
        size: PAGINATION_SIZE,
        searchKey: searchKey,
      })
    );
  };

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(
      fetchCompanys({ page: 1, size: PAGINATION_SIZE, searchKey: searchKey })
    );
  }, [dispatch, searchKey]);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '1280px', padding: '20px' }}>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }} sx = {{mb: 2}}>
        <Typography variant="h2" style={{ color: '#7ABACC' }} gutterBottom>
        {/* Top Company */}
          Danh sách công ty
        </Typography>
        <TextField
          id="search"
          label="Search"
          onChange={handleSearch}
          sx={{ width: '300px' }}
        />
      </Box>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data?.map((company) => (
          <Grid xs={2} sm={4} md={4} key={company._id}>
            <CompanyItem company={company} loading={loading} />
          </Grid>
        ))}
      </Grid>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      >
        <Pagination
          count={totalPage}
          color="primary"
          onChange={handleChangePage}
        />
      </div>
    </Box>
  );
};
