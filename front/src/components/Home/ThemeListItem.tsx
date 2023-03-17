import React from 'react';
import styles from '@/styles/home.module.css';
import { ThemeType } from '@/components/types';
interface Props {
  theme: ThemeType;
}
export default function ThemeListItem({ theme }: Props) {
  return (
    <li className={styles['theme-item']}>
      <img src={theme.image} alt={theme.title} className={styles['theme-item-img']} />
      <p>{theme.title}</p>
    </li>
  );
}
