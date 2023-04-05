import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';
import { RecipeWriteType } from '@/types/recipe';
// const authApi = authApiInstance();
//  추천 레시피
export const getContainRecipeAPI = async (page: string, id: string) => {
  try {
    const { data } = await authApiInstance().get(`recipes/contain?${page}-id=${id}`);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

//  레시피 상세 출력
export const getRecipeDetailApi = async (id: string) => {
  try {
    const { data } = await authApiInstance().get(`/recipes/${id}`);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

//  레시피 등록
export const postRecipeAPI = async (data: RecipeWriteType) => {
  try {
    const result = await authApiInstance().post(`/recipes`, data);
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

// 키워드로 과자 찾기
export const getSnackKeywordSearch = async (keyword: string) => {
  try {
    const { data } = await authApiInstance().get(`/snacks?keyword=${keyword}`);
    return data.data.content;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

//  레시피 삭제
export const deleteRecipeAPI = async (id: string) => {
  try {
    const result = await authApiInstance().delete(`/recipes/${id}`);
    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

//  레시피 수정
export const putRecipeAPI = async (id: string, data: RecipeWriteType) => {
  try {
    const result = await authApiInstance().put(`/recips/${id}`, data);
    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

//  레시피 좋아요
export const postRecipeLikeAPI = async (id: string) => {
  try {
    const result = await authApiInstance().post(`/recipes/${id}/like`);
    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

//  레시피 좋아요 취소
export const deleteRecipeLikeAPI = async (id: string) => {
  try {
    const result = await authApiInstance().delete(`/recipes/${id}/like`);
    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

//  레시피 댓글 조회
export const getRecipeCommentsAPI = async (id: string) => {
  try {
    const { data } = await authApiInstance().get(`/recipes/${id}/comments`);
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

// 레시피 댓글 작성
export const postRecipeCommentAPI = async (id: string, data: { content: string }) => {
  try {
    const result = await authApiInstance().post(`/recipes/${id}/comments`, data);
    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};

// 레시피 댓글 삭제
export const deleteRecipeCommentAPI = async (recipeId: string, commentId: string) => {
  try {
    const result = await authApiInstance().delete(`/recipes/${recipeId}/comments/${commentId}`);
    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('에러: ', error.response);
      return error.response?.data;
    }
  }
};
