import { authApiInstance, fastApiInstance } from '@/apis/axiosConfig';
import { MemberPreferType } from '@/types/member';
import { checkPreferType } from '@/types/snack';
import { isAxiosError } from 'axios';
// const authApi = authApiInstance();
const fastApi = fastApiInstance();

export const firstPreferApi = async () => {
  try {
    const { data } = await authApiInstance().get(`/snacks/preference`);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};

export const CbfApi = async (result: MemberPreferType) => {
  try {
    const { data } = await fastApi.post(`/prefer`, result);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};

export const checkPreferenceAPI = async (result: checkPreferType[]) => {
  try {
    const { data } = await authApiInstance().post(`/member/preference`, result);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};
