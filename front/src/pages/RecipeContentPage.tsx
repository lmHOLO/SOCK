import React, { useEffect, useState } from 'react';
import TopNav from '@/components/Navbar/TopNav';
import BottomNav from '@/components/Navbar/BottomNav';
import styles from '@/styles/grid.module.css';
import { GridRecipeListItemType } from '@/types/recipe';
import RecipeGridList from '@/components/common/RecipeGridList';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeListAPI } from '@/apis/api/recipeList';

export default function RecipeContentPage() {
  const [sort, setSort] = useState<string>('latest');
  const [recipeList, setRecipeList] = useState<GridRecipeListItemType[]>([]);

  const { keyword,arrange,memberId } = useParams();

  useEffect(()=>{
    if(!keyword && !memberId){
      getRecipeListAPI("",sort,"").then((data)=>{
        setRecipeList(data.content);
    });
  }
},[keyword,arrange,memberId]);


  const handleSort = async (sort: string) => {
    setSort(sort);
    getRecipeListAPI("",sort,"").then((data)=>{
      setRecipeList(data.content);
    });
    
  };

  return (
    <div className='side-margin'>
      <TopNav />
      {/* <div className={styles['theme-container']}>{theme === 'recipes' && <h1>레시피</h1>}</div> */}
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
