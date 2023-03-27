export type RecipeListItemType = {
  recipeId: string;
  image: string;
  title: string;
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

export type SnackTagType = {
  id: string;
  image: string;
  name: string;
};

export type TagSearchType = {
  snackId: string;
  image: string;
  name: string;
};
