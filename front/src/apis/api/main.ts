import { authApiInstance, fastApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';

const fastApi = fastApiInstance();

export const getAdsAPI = async () => {
  try {
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

export const recommendIdAPI = async (member_id: number, grade: string) => {
  try {
    const { data } = await fastApi.get(`/recommend/cbf/${member_id}?grade=${grade}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};

export const snackDetailAPI = async (snack_id: number) => {
  try {
    const { data } = await authApiInstance().get(`/snacks/${snack_id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};
