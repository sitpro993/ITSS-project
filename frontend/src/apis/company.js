import { getData } from '../config/api';

const logoList =
  'https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/social-facebook-icon.png';

export const CompanyApi = {
  getCompanys: async ({ page, size }) => {
    const accessToken = `Bearer ${localStorage.getItem('accessToken')}`;
    const result = await getData(`company?pageNumber=${page-1}?limit=${size}`, accessToken);

    return {
      total: result?.data?.totalCompanys || 0,
      rowsPerPage: result?.data?.rowsPerPage || 0,
      data: result?.data?.data?.map((company) => ({
        ...company,
        logo: logoList,
      })),
    }
  },
};
