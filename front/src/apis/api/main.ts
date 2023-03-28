import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';
const authApi = authApiInstance();

export const getAdsAPI = async () => {
  try {
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};
