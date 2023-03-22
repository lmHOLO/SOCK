import { apiInstance, authApiInstance } from '@/apis/axiosConfig';
const api = apiInstance();
const authApi = authApiInstance();

export const loginApi = async () => {
  try {
    const { data } = await authApi.get(`/member`);
    console.log('멤버 api', data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
