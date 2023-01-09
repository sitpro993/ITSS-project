import { createAsyncThunk } from '@reduxjs/toolkit';
import { CompanyApi } from '../../apis/company';

export const fetchCompanys = createAsyncThunk(
  'companys/fetchCompanys',
  async ({ page, size, searchKey }) => {
    const response = await CompanyApi.getCompanys({ page, size, searchKey });
    return response;
  }
);

export const fetchCompanyDetail = createAsyncThunk(
  'companys/fetchCompanyDetail',
  async ({id}) => {
    const response = await CompanyApi.getCompanyDetail({id});
    return response;
  }
)