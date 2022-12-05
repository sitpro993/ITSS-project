import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestApi } from '../../apis/request';

export const fetchRequests = createAsyncThunk(
  'requests/fetchRequests',
  async () => {
    console.log('fetchRequests');
    const response = await RequestApi.getRequests();
    return response;
  }
);
