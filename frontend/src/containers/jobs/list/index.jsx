import { useEffect } from 'react';
import { JobItem } from './item';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector, useDispatch } from 'react-redux';
import { selectJobList } from '../../../redux/selector/jobSelector';
import { fetchJobs } from '../../../redux/thunks/jobThunk';

export const JobsList = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectJobList);

  useEffect(() => {
    dispatch(fetchJobs({ page: 1, size: 8 }));
  }, [dispatch]);

  const handleChangePage = (_, value) => {
    dispatch(fetchJobs({ page: value, size: 8 }));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '20px 0px' }}>
        <h1>Jobs List</h1>
      </div>

      <Box sx={{ flexGrow: 1, maxWidth: '1280px', padding: '20px' }}>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data?.map((job) => (
            <Grid xs={2} sm={4} md={3} key={job.id}>
              <JobItem job={job} loading={loading} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <div style={{ paddingTop: '10px' }}>
        <Pagination count={10} color="primary" onChange={handleChangePage} />
      </div>
    </div>
  );
};
