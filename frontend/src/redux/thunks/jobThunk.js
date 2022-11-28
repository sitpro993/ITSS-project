import { createAsyncThunk } from '@reduxjs/toolkit';
import { JobApi } from '../../apis/job';

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ page, size }) => {
    const response = await JobApi.getJobs({ page, size });
    return response;
  }
);
