import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';
const authApi = authApiInstance();
export const getSnackDetailApi = async (id: string) => {
  try {
    const { data } = await authApi.get(`snacks/${id}`);
    console.log('snack', data);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};
