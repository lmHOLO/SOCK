import React from 'react';
import { Paper } from '@mui/material';
import { RecipeImageType } from '@/components/types';
import styles from '@/styles/home.module.css';
interface Props {
  image: RecipeImageType;
}

export default function AdItem({ image }: Props) {
  return (
    <Paper style={{ width: '100%', height: '28vh', margin: '8px 0px' }}>
      <img src={image.image} alt={image.image} className={styles['ad-img']} />
    </Paper>
  );
}
