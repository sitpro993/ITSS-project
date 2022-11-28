import { createAsyncThunk } from '@reduxjs/toolkit';
import { CompanyApi } from '../../apis/company';

export const fetchCompanys = createAsyncThunk(
  'companys/fetchCompanys',
  async ({ page, size }) => {
    const response = await CompanyApi.getCompanys({ page, size });
    return response;
  }
);
