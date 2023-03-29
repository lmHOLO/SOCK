import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';
const authApi = authApiInstance();

export const firstPreferApi = async () => {
  try {
    const { data } = await authApi.get(`/snacks/preference`);
    console.log(data.data, '초기 선호도 평가용 과자 목록 조회');
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};
