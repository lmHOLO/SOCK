import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';

const authApi = authApiInstance();

export const getContainRecipeAPI = async (page: string, id: string) => {
  try {
    const { data } = await authApi.get(`recipes/contain?${page}-id=${id}`);
    console.log(data);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};
