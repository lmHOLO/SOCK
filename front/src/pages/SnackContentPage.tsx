import React, { useEffect, useState } from 'react';
import SnackGridList from '@/components/common/SnackGridList';
import { SnackDetailType } from '@/types/snack';
import TopNav from '@/components/Navbar/TopNav';
import BottomNav from '@/components/Navbar/BottomNav';
import styles from '@/styles/grid.module.css';
import { useParams } from 'react-router-dom';
import { getSnackListAPI } from '@/apis/api/snackList';
import { getThemeSnackListAPI } from '@/apis/api/theme';

export default function SnackContentPage() {
  const [sort, setSort] = useState<string>('latest');
  const [snackList, setSnackList] = useState<SnackDetailType[]>([]);
  const { theme } = useParams(); // 주제

  const { keyword, flavors, types, arrange } = useParams();
  const undefindValue = [''];
  useEffect(() => {
    if (!theme && !keyword && !flavors && !types) {
      getSnackListAPI('', undefindValue, undefindValue, sort).then((data) => {
        setSnackList(data.content);
      });
    }
    if (theme) {
      getThemeSnackListAPI(theme).then((data) => {
        setSnackList(data.content);
      });
    }
  }, [keyword, flavors, types, arrange]);

  const handleSort = async (sort: string) => {
    setSort(sort);
    getSnackListAPI('', undefindValue, undefindValue, sort).then((data) => {
      setSnackList(data.content);
    });
  };
  return (
    <div>
      <TopNav />
      <div className={styles['theme-container']}>
        {theme === 'RETRO' && (
          <header>
            <h1 className=''>레트로</h1>
          </header>
        )}
        {theme === 'MOVIE' && (
          <header className={`${styles['movie-header']}`}>
            <div className={styles['movie-logo']}>
              <img src={require(`@/assets/home/movie_main.png`)} alt='movie_main' />
              <img src={require(`@/assets/home/movie_side.png`)} alt='movie_side' />
            </div>
          </header>
        )}
        {theme === 'MILK' && <h1>우유</h1>}
        {theme === 'ALCHOL' && <h1>술</h1>}
      </div>

      {!theme && (
        <div className={styles['sort']}>
          {sort === 'popular' && (
            <>
              <button className={styles['bold']}>인기순</button>
              <button onClick={() => handleSort('latest')}>최신순</button>
            </>
          )}
          {sort === 'latest' && (
            <>
              <button onClick={() => handleSort('popular')}>인기순</button>
              <button className={styles['bold']}>최신순</button>
            </>
          )}
        </div>
      )}
      <SnackGridList snackList={snackList} />
      <BottomNav />
    </div>
  );
}
