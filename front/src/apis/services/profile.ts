import { GridRecipeListItemType } from '@/types/recipe';

export const getMyRecipeList = (rawRecipeList: GridRecipeListItemType[]) => {
  return rawRecipeList.map(({ recipeId, recipeImage }) => {
    return {
      recipeId: recipeId,
      image: recipeImage,
    };
  });
};
