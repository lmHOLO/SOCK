import React from 'react';
import { PostSnackTagType } from '@/types/recipe';
import styles from '@/styles/recipe_detail.module.css';
interface Props {
  tag: PostSnackTagType;
}
export default function Tag({ tag }: Props) {
  return (
    <div className={styles['tag-container']}>
      <img src={tag.image} alt={tag.name} />
      <p>{tag.name}</p>
    </div>
  );
}
