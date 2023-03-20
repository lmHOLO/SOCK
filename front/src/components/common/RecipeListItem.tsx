import React from 'react';
import { RecipeListItemType } from '@/types';
import styles from '@/styles/recipe_list.module.css';
interface Props {
  recipe: RecipeListItemType;
}
export default function RecommendListItem({ recipe }: Props) {
  return (
    <li className={styles['recipe-list-item-container']}>
      <img src={recipe.image} alt={recipe.title} className={styles['recipe-list-item']} />
    </li>
  );
}
