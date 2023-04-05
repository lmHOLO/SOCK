import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';
import { UpdateProfileType } from '@/types/member';

export const loginApi = async () => {
  try {
    const { data } = await authApiInstance().get(`/member`);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};

export const otherMemberProfileApi = async (memberId: string) => {
  try {
    const { data } = await authApiInstance().get(`/member/${memberId}`);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};

export const updateProfileAPI = async (updateProfile: UpdateProfileType) => {
  try {
    const { data } = await authApiInstance().put('/member', updateProfile);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};

export const getMemberListAPI = async (nickname: string) => {
  try {
    const { data } = await authApiInstance().get(`/member/search?nickname=${nickname}`);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};

export const checkNicknameDuplicationAPI = async (nickname: string) => {
  try {
    const { data } = await authApiInstance().get(`/member/nickname?nickname=${nickname}`);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
    }
  }
};
