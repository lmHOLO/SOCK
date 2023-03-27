import { apiInstance, authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';
const api = apiInstance();
const authApi = authApiInstance();

export const loginApi = async () => {
  try {
    const { data } = await authApi.get(`/member`);
    console.log(data);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};
