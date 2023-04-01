import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';
export const getMyRecipeListAPI = async (memberId: string) => {
  try {
    const { data } = await authApiInstance().get(`/recipes?member-id=${memberId}`);
    return data.data.content;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

export const getLikedRecipeListAPI = async (memberId: string) => {
  try {
    const { data } = await authApiInstance().get(`/recipes/like?member-id=${memberId}`);
    console.log(data);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};
export const getLikedSnackListAPI = async (memberId: string) => {
  try {
    const { data } = await authApiInstance().get(`/snacks/like?member-id=${memberId}`);
    console.log(data);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};
