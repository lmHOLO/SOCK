import React from 'react';
import { Paper } from '@mui/material';
import styles from '@/styles/recipe_detail.module.css';
interface Props {
  image: string;
}
export default function AdItem({ image }: Props) {
  return (
    <Paper className={styles['recipe-paper']}>
      <img src={image} alt={image} className={styles['recipe-img']} />
    </Paper>
  );
}
