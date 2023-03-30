import React from 'react';
import styles from '@/styles/recipe_detail.module.css';
import { GetSnackTagType } from '@/types/recipe';
interface Props {
  tag: GetSnackTagType;
}
export default function Tag({ tag }: Props) {
  return (
    <div className={styles['tag-container']}>
      <img src={tag.image} alt={tag.snackName} />
      <p>{tag.snackName}</p>
    </div>
  );
}
