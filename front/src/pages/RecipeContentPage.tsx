import React, { useState } from 'react';
import SnackGridList from '@/components/common/SnackGridList';
import { SnackDetailType } from '@/types/snack';
import TopNav from '@/components/Navbar/TopNav';
import BottomNav from '@/components/Navbar/BottomNav';
import styles from '@/styles/grid.module.css';
import { useParams, useSearchParams } from 'react-router-dom';
import { GridRecipeListItemType } from '@/types/recipe';
import RecipeGridList from '@/components/common/RecipeGridList';

export default function RecipeContentPage() {
  const [sort, setSort] = useState<string>('popular');
  const [recipeList, setRecipeList] = useState<GridRecipeListItemType[]>([
    {
      myLikeCheck: false,
      writer: '김수빈',
      writerImage: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      recipeId: '1',
      recipeTitle: '감자칩을 맛있게 해서 먹어봅시다?>?????',
      recipeImage: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
    },
    {
      myLikeCheck: false,
      writer: '김수빈',
      writerImage: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      recipeId: '2',
      recipeTitle: '감자칩을 맛있게 해서 먹어봅시다?>?????',
      recipeImage: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
    },
    {
      myLikeCheck: false,
      writer: '김수빈',
      writerImage: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      recipeId: '3',
      recipeTitle: '감자칩을 맛있게 해서 먹어봅시다?>?????',
      recipeImage: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
    },
    {
      myLikeCheck: false,
      writer: '김수빈',
      writerImage: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      recipeId: '4',
      recipeTitle: '감자칩을 맛있게 해서 먹어봅시다?>?????',
      recipeImage: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
    },
    {
      myLikeCheck: false,
      writer: '김수빈',
      writerImage: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      recipeId: '5',
      recipeTitle: '감자칩을 맛있게 해서 먹어봅시다?>?????',
      recipeImage: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
    },
  ]);
  const { theme } = useParams(); // 주제
  const handleSort = async (sort: string) => {
    setSort(sort);
  };
  return (
    <div className='side-margin'>
      <TopNav />
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
      <RecipeGridList recipeList={recipeList} />
      <BottomNav />
    </div>
  );
}
