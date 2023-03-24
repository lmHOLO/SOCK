export type RecipeListItemType = {
  recipeId: string;
  image: string;
  title: string;
};

export type RecipeWriteType = {
  writerId: string;
  images: string[];
  snackIds: string[];
  content: string;
};
