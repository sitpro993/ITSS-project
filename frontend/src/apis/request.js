import { getData } from '../config/api';

export const RequestApi = {
  getRequests: async () => {
    const accessToken = `Bearer ${localStorage.getItem('accessToken')}`;
    const result = await getData(`job`, accessToken);

    return result?.data?.data || [];
  },
};
