import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';

// keyword,flavors,types,arrange
export const getSnackListAPI = async (keyword: string, flavors: string[], types: string[], arrange: string) => {
  try {
    // console.log('API.keyword=', keyword);
    // console.log('API.flavors=', flavors);
    // console.log('API.types=', types);
    // console.log('API.arrange=', arrange);
    let url = `/snacks?size=30&arrange=${arrange}`;
    if (`${keyword}`) url = url + `&keyword=${keyword}`;
    if (`${flavors}`) url = url + `&flavors=${flavors}`;
    if (`${types}`) url = url + `&types=${types}`;

    const { data } = await authApiInstance().get(url);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};
