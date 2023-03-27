import { authApiInstance } from "@/apis/axiosConfig";
import { isAxiosError } from "axios";

const authApi = authApiInstance();

export const getWorldcupSnackListAPI = async () => {
  try {
    const { data } = await authApi.get(`/event/worldcup`);
    console.log("snack List = ", data);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("에러: ", error.response);
      return error.response?.data;
    }
  }
};
