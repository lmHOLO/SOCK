import { SnackTagType } from '@/types/recipe';
import React from 'react';
import styles from '@/styles/recipe_detail.module.css';
import Tag from './Tag';

interface Props {
  tagList: SnackTagType[];
}
export default function TagList({ tagList }: Props) {
  return (
    <ul className={styles['tag-list']}>
      {tagList.map((tag) => (
        <Tag key={tag.id} tag={tag} />
      ))}
    </ul>
  );
}
