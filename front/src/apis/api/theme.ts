import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';

export const getThemeSnackListAPI = async (theme: string) => {
  try {
    const { data } = await authApiInstance().get(`/theme?theme=${theme}&size=30`);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};
