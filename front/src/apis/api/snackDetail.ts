import { authApiInstance } from '@/apis/axiosConfig';
const authApi = authApiInstance();
export const getSnackDetail = async (id: number) => {
  try {
    const { data } = await authApi.get(`snacks/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
