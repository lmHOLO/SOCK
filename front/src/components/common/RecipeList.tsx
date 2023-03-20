import React from 'react';
import RecipeListItem from '@/components/common/RecipeListItem';
import { RecipeListItemType } from '@/components/types';
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
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
      <AddCircleOutlineIcon className={styles['more-btn']} />
    </ul>
  );
}
