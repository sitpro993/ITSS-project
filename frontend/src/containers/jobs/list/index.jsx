import { useState, useEffect } from 'react';
import { JobItem } from './item';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export const JobsList = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = (page, size) => {
    return [...Array(size)].map((_, index) => ({
      id: index * page,
      title: `Job ${index * page}`,
      description: `Job ${index * page} description`,
    }));
  };

  const handleChangePage = (_, value) => {
    setJobs(fetchJobs(value, 8));
  };

  useEffect(() => {
    const result = fetchJobs(1, 8);

    setJobs(result);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Jobs List</h1>
      <Box sx={{ flexGrow: 1, maxWidth: '1280px' }}>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {jobs.map((job) => (
            <Grid xs={2} sm={4} md={3} key={job.id}>
              <JobItem job={job} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}
      >
        <Pagination count={10} color="primary" onChange={handleChangePage} />
      </div>
    </div>
  );
};
