import React, { useEffect, useState } from 'react';
import styles from '@/styles/grid.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GridRecipeListItemType } from '@/types/recipe';
import { useNavigate } from 'react-router';
interface Props {
  recipe: GridRecipeListItemType;
}
export default function RecipeGridListItem({ recipe }: Props) {
  const navigate = useNavigate();
  const recipeNavigate = (id: string): void => {
    navigate(`/recipes/${id}`);
  };
  return (
    <li className={styles['card-item']} onClick={() => recipeNavigate(recipe.recipeId)}>
      <p className={styles['title']}>{recipe.recipeTitle}</p>
      <figure className={styles['card-image']}>
        <img src={recipe.recipeImage} alt={recipe.recipeTitle} />
      </figure>
      <div className={styles['recipe-info']}>
        <div className={styles['member-data']}>
          <img src={recipe.writerImage} alt={recipe.writer} />
          <p>{recipe.writer}</p>
        </div>
        {recipe.myLikeCheck ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </div>
    </li>
  );
}
