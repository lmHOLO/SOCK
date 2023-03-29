import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';

const authApi = authApiInstance();

export const getWorldcupSnackListAPI = async () => {
  try {
    const { data } = await authApi.get(`/event/worldcup`);
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
    const { data } = await authApi.get("/event/sbti");
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("에러: ", error.response);
      return error.response?.data;
    }
  }
};

export const getSbtiResultAPI = async (list: number[]) => {
  try {
    const { data } = await authApi.post("/event/sbti", list);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("에러: ", error.response);
      return error.response?.data;
    }
  }
};
