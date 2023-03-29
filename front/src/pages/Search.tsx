import TopNavOnlyBack from '@/components/Navbar/TopNavOnlyBack';
import PositionedMenu from '@/components/Search/PositionedMenu';
import { SearchThemeType } from '@/types/search';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/search.module.css';
import Popular from '@/components/Search/Popular';

import { getTopPopularListAPI } from '@/apis/api/search';

export default function Search() {
  const [theme, setTheme] = useState<SearchThemeType>('snack'); // 찾는 주제
  const [searchBar, setSearchBar] = useState<string>('');
  const [popularList, setPopularList] = useState<{ id: string; snackCheck: boolean; score: number; name: string }[]>([]);

  useEffect(() => {
    getTopPopularListAPI().then((data) => {
      setPopularList(data);
    });
  }, []);

  const handleSearchBar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value);
  };

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
