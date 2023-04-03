import React from 'react';
import { RecipeListItemType } from '@/types/recipe';
import styles from '@/styles/recipe_list.module.css';
import { useNavigate } from 'react-router-dom';
interface Props {
  recipe: RecipeListItemType;
}
export default function RecommendListItem({ recipe }: Props) {
  const navigate = useNavigate();
  const recipeNavigate = (id: string) => {
    navigate(`/recipes/${id}`);
  };
  return (
    <li className={styles['recipe-list-item-container']} onClick={() => recipeNavigate(recipe.recipeId)}>
      <img src={recipe.recipeImage} alt={recipe.recipeTitle} className={styles['recipe-list-item']} />
    </li>
  );
}
