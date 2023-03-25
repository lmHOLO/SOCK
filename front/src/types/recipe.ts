export type RecipeListItemType = {
  recipeId: string;
  image: string;
  title: string;
};

export type PostingTabType = 'SELECT_IMAGE' | 'CROP_IMAGE' | 'WRITE_CONTENT';
export type RecipeWriteType = {
  writerId: string;
  images: string[];
  snackIds: string[];
  content: string;
};
