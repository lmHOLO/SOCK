import React from 'react';
import { ProfileRecipeType } from '@/types/recipe';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/profile.module.css';

interface Props {
  recipeList: ProfileRecipeType[];
}
export default function RecipeGrid({ recipeList }: Props) {
  const navigate = useNavigate();
  return (
    <section className={`${styles['primary']} side-margin`}>
      <ul className={styles['card-list']}>
        {recipeList &&
          recipeList.map((recipe, index) => {
            return (
              <img
                key={index}
                src={recipe.image}
                alt={recipe.recipeId}
                onClick={() => navigate(`/recipes/${recipe.recipeId}`)}
                className={styles['card-item']}
              />
            );
          })}
      </ul>
    </section>
  );
}
