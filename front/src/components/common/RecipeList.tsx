import React from 'react';
import RecipeListItem from '@/components/common/RecipeListItem';
import { RecipeListItemType } from '@/types/recipe';
import styles from '@/styles/recipe_list.module.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface Props {
  recipeList: RecipeListItemType[];
}

export default function RecommendList({ recipeList }: Props) {
  return (
    <ul className={styles['recipe-list']}>
      {recipeList.map((recipe) => (
        <RecipeListItem key={recipe.recipeId} recipe={recipe} />
      ))}
      {recipeList.length !== 0 ? <AddCircleOutlineIcon className={styles['more-btn']} /> : <p className={styles['no-list']}>등록된 레시피가 없습니다</p>}
    </ul>
  );
}
