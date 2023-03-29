import TopNavOnlyBack from '@/components/Navbar/TopNavOnlyBack';
import PositionedMenu from '@/components/Search/PositionedMenu';
import { SearchThemeType } from '@/types/search';
import React, { useState } from 'react';
import styles from '@/styles/search.module.css';
import Popular from '@/components/Search/Popular';

export default function Search() {
  const [theme, setTheme] = useState<SearchThemeType>('snack'); // 찾는 주제
  const [searchBar, setSearchBar] = useState<string>('');
  const handleSearchBar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value);
    console.log(searchBar);
  };
  const [popularList, setPopularList] = useState<{ snackId: string; snackTitle: string }[]>([
    {
      snackId: '1',
      snackTitle: '과자1',
    },
    {
      snackId: '2',
      snackTitle: '과자2',
    },
    {
      snackId: '3',
      snackTitle: '과자3',
    },
    {
      snackId: '4',
      snackTitle: '과자4',
    },
    {
      snackId: '5',
      snackTitle: '과자5',
    },
    {
      snackId: '6',
      snackTitle: '과자6',
    },
    {
      snackId: '7',
      snackTitle: '과자7',
    },
    {
      snackId: '8',
      snackTitle: '과자8',
    },
    {
      snackId: '9',
      snackTitle: '과자9',
    },
    {
      snackId: '10',
      snackTitle: '과자10',
    },
  ]);
  return (
    <div>
      <TopNavOnlyBack />
      <div className={styles['search-bar-conatiner']}>
        <PositionedMenu theme={theme} setTheme={setTheme} />
        <input className={styles['search-bar']} type='text' onChange={(e) => handleSearchBar(e)} />
        <button className={styles['search-btn']}>검색</button>
      </div>
      <Popular popularList={popularList} />
    </div>
  );
}
