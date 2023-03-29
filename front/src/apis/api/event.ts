import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';

export const getWorldcupSnackListAPI = async () => {
  try {
    const { data } = await authApiInstance().get(`/event/worldcup`);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

export const getSbtiQuestionListAPI = async () => {
  try {
    const { data } = await authApiInstance().get('/event/sbti');
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

export const getSbtiResultAPI = async (list: number[]) => {
  try {
    const { data } = await authApiInstance().post('/event/sbti', list);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};
