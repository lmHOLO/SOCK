import React from 'react';
import styles from '@/styles/grid.module.css';
import { GridRecipeListItemType } from '@/types/recipe';
import RecipeGridListItem from './RecipeGridListItem';

interface Props {
  recipeList: GridRecipeListItemType[];
}
export default function RecipeGridList({ recipeList }: Props) {
  return (
    <section className={styles['primary']}>
      <ul className={styles['card-list']}>
        {recipeList && recipeList.map((recipe, index) => <RecipeGridListItem recipe={recipe} key={index} />)}
      </ul>
    </section>
  );
}
