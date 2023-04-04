import { authApiInstance, fastApiInstance } from '@/apis/axiosConfig';
import { MemberPreferType } from '@/types/member' 
import { checkPreferType } from '@/types/snack' 
import { isAxiosError } from 'axios';
// const authApi = authApiInstance();
const fastApi = fastApiInstance();

export const firstPreferApi = async () => {
  try {
    const { data } = await authApiInstance().get(`/snacks/preference`);
    console.log(data.data, '초기 선호도 평가용 과자 목록 조회');
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};

export const CbfApi = async (result : MemberPreferType ) => {
  try {
    const { data } = await fastApi.post(`/prefer`, result);
    console.log(data, 'fastapi 에서 불러온 유사도 결과');
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};

export const checkPreferenceAPI = async (result : checkPreferType[] ) => {
  try {
    const { data } = await authApiInstance().post(`/member/preference`, result);
    console.log(data, 'checkpreference를 1로 변경');
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};