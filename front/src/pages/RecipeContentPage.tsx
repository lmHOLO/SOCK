import React, { useEffect, useState } from 'react';
import TopNav from '@/components/Navbar/TopNav';
import BottomNav from '@/components/Navbar/BottomNav';
import styles from '@/styles/grid.module.css';
import { GridRecipeListItemType } from '@/types/recipe';
import RecipeGridList from '@/components/common/RecipeGridList';
import { useParams } from 'react-router-dom';
import { getRecipeListAPI } from '@/apis/api/recipeList';

export default function RecipeContentPage() {
  const [sort, setSort] = useState<string>('popular');
  const [recipeList, setRecipeList] = useState<GridRecipeListItemType[]>([]);

  const { keyword,arrange,memberId } = useParams();
  const defaultArrange = 'recent';
  // 냅따 뿌리기만 함 - 3/31 수정할 것
  useEffect(()=>{
    if(!keyword && !memberId){
      getRecipeListAPI("",defaultArrange,"").then((data)=>{
        console.log(data);
        setRecipeList(data.content);
    });
  }else if(keyword){
      getRecipeListAPI(keyword,defaultArrange,"").then((data)=>{
        console.log(data);
        setRecipeList(data.content);
      });
  }else if(arrange){
    getRecipeListAPI("","popular","").then((data)=>{
      console.log(data);
      setRecipeList(data.content);
      handleSort('latest');
    });
  }
  },[keyword,arrange,memberId]);


  const handleSort = async (sort: string) => {
    setSort(sort);
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
