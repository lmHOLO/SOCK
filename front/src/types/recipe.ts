export type RecipeListItemType = {
  recipeId: string;
  recipeImage: string;
  recipeTitle: string;
};

export type GridRecipeListItemType = {
  myLikeCheck: boolean;
  writer: string;
  writerImage: string;
  recipeId: string;
  recipeTitle: string;
  recipeImage: string;
};

export type RecipeWriteType = {
  title: string;
  images: string[];
  snackIds: string[];
  content: string;
};

// 레시피 작성 관련
export type PostingTabType = 'SELECT_IMAGE' | 'CROP_IMAGE' | 'WRITE_CONTENT';

export type Area = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export type PostSnackTagType = {
  id: string;
  image: string;
  name: string;
};

// 레시피 디테일 관련
export type RecipeDetailType = {
  recipeId: string;
  createdDate: string;
  title: string;
  writerId: string;
  writerNickname: string;
  writerImage: string;
  sbti: string;
  grade: string;
  recipeImages: GetRecipeImageType[];
  content: string;
  tag: GetSnackTagType[];
  like: boolean;
  totalLikes: number;
};

export type GetSnackTagType = {
  tagId: string;
  image: string;
  recipeId: string;
  snackId: string;
  snackName: string;
};

export type GetRecipeImageType = {
  imageId: string;
  recipeImage: string;
};

export type RecipeCommentType = {
  commentId: string;
  content: string;
  createdDate: string;
  grade: string;
  memberId: string;
  memberImage: string;
  nickname: string;
  sbti: string;
};

// 마이페이지 레시피
export type ProfileRecipeType = {
  recipeId: string;
  image: string;
};
