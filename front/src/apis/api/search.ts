import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';

const authApi = authApiInstance();

export const getTopPopularListAPI = async () => {
  try {
    const { data } = await authApi.get('/qscore/top');
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};
