import { GridRecipeListItemType, ProfileRecipeType } from '@/types/recipe';
import { LikedSnackType } from '@/types/snack';

export const getMyRecipeList = (rawRecipeList: GridRecipeListItemType[]) => {
  return rawRecipeList.map(({ recipeId, recipeImage }) => {
    return {
      id: recipeId,
      image: recipeImage,
    };
  });
};

export const getLikedSnackList = (rawRecipeList: LikedSnackType[]) => {
  return rawRecipeList.map(({ snackId, image }) => {
    return {
      id: snackId,
      image: image,
    };
  });
};

export const getLikedRecipeList = (rawRecipeList: ProfileRecipeType[]) => {
  return rawRecipeList.map(({ recipeId, image }) => {
    return {
      id: recipeId,
      image: image,
    };
  });
};
