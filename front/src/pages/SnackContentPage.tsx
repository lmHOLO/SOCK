import React, { useState } from 'react';
import SnackGridList from '@/components/common/SnackGridList';
import { SnackDetailType } from '@/types/snack';
import TopNav from '@/components/Navbar/TopNav';
import BottomNav from '@/components/Navbar/BottomNav';
import styles from '@/styles/grid.module.css';
import { useParams, useSearchParams } from 'react-router-dom';

export default function SnackContentPage() {
  const [sort, setSort] = useState<string>('popular');
  const [snackList, setSnackList] = useState<SnackDetailType[]>([
    {
      snackId: '1',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      name: '포카칩 오리지널',
      sumOfStars: 10,
      numberOfParticipants: 3,
      type: { id: '1', name: '안녕' },
      flavors: [{ id: '1', name: '단맛' }],
      like: false,
      totalLikes: '1',
    },
    {
      snackId: '2',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      name: '포카칩 오리지널',
      sumOfStars: 10,
      numberOfParticipants: 3,
      type: { id: '1', name: '안녕' },
      flavors: [{ id: '1', name: '단맛' }],
      like: false,
      totalLikes: '1',
    },
    {
      snackId: '3',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      name: '포카칩 오리지널',
      sumOfStars: 10,
      numberOfParticipants: 3,
      type: { id: '1', name: '안녕' },
      flavors: [{ id: '1', name: '단맛' }],
      like: false,
      totalLikes: '1',
    },
    {
      snackId: '4',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      name: '포카칩 오리지널',
      sumOfStars: 10,
      numberOfParticipants: 3,
      type: { id: '1', name: '안녕' },
      flavors: [{ id: '1', name: '단맛' }],
      like: false,
      totalLikes: '1',
    },
    {
      snackId: '5',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      name: '포카칩 오리지널',
      sumOfStars: 10,
      numberOfParticipants: 3,
      type: { id: '1', name: '안녕' },
      flavors: [{ id: '1', name: '단맛' }],
      like: false,
      totalLikes: '1',
    },
  ]);
  const { theme } = useParams(); // 주제
  const handleSort = async (sort: string) => {
    setSort(sort);
  };
  return (
    <div className='side-margin'>
      <TopNav />
      <div className={styles['theme-container']}>
        {theme === 'snacks' && <h1>과자</h1>}
        {theme === 'retro' && <h1>레트로</h1>}
        {theme === 'milk' && <h1>우유</h1>}
      </div>
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
      <SnackGridList snackList={snackList} />
      <BottomNav />
    </div>
  );
}
