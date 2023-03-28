import { apiInstance, authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';
const api = apiInstance();
const authApi = authApiInstance();

export const loginApi = async () => {
  try {
    const { data } = await authApi.get(`/member`);
    console.log(data, '초기선호도 조사를 위한 데이터 확인');
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};
