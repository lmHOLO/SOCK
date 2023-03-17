import React, { useState } from 'react';
import { ThemeType } from '@/components/types';
import styles from '@/styles/home.module.css';
import ThemeListItem from './ThemeListItem';
export default function ThemeList() {
  // TODO: 나중에 api로 themList 받아오기
  const [themeList, setThemList] = useState<ThemeType[]>([
    {
      id: 1,
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '코흘리며 먹던 추억의 과자',
    },
    {
      id: 2,
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '영화보면서 먹을 팝콘과자 추천!',
    },
    {
      id: 3,
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '감자칩이 최고!',
    },
  ]);
  return (
    <ul className={styles['theme-list']}>
      {themeList.map((theme) => (
        <ThemeListItem key={theme.id} theme={theme} />
      ))}
    </ul>
  );
}
