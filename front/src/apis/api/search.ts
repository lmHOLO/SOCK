import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';

const authApi = authApiInstance();

export const getTopPopularListAPI = async () => {
  try {
    const { data } = await authApi.get('/qscore/top');
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

export const getRecipeListAPI = async (keyword: string, arrange: string, memberId: string) => {
  try {
    let url = `/recipes`;

    if (`${arrange}`) url = url + `?arrange=${arrange}`;

    if (`${keyword}`) {
      if (`${arrange}`) url = url + `&keyword=${keyword}`;
      else url = url + `?keyword=${keyword}`;
    }
    if (`${memberId}`) {
      url = url + `?member-id=${memberId}`;
    }

    const { data } = await authApiInstance().get(url);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};
