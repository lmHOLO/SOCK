import React, { useEffect, useState } from 'react';
import TopNav from '@/components/Navbar/TopNav';
import BottomNav from '@/components/Navbar/BottomNav';
import styles from '@/styles/grid.module.css';
import { GridRecipeListItemType } from '@/types/recipe';
import RecipeGridList from '@/components/common/RecipeGridList';
// import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { getRecipeListAPI } from '@/apis/api/recipeList';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function RecipeContentPage() {
  const navigate = useNavigate();
  const [sort, setSort] = useState<string>('latest');
  const [recipeList, setRecipeList] = useState<GridRecipeListItemType[]>([]);

  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      getRecipeListAPI('', sort, '').then((data) => {
        setRecipeList(data.content);
      });
    } else {
      getRecipeListAPI(state, sort, '').then((data) => {
        setRecipeList(data.content);
      });
    }
  }, [state]);

  const handleSort = async (sort: string) => {
    setSort(sort);
    getRecipeListAPI('', sort, '').then((data) => {
      setRecipeList(data.content);
    });
  };

  return (
    <div className='side-margin'>
      <TopNav />
      <audio autoPlay>
        <source src={require('@/assets/eating_cracker.mp3')} type='audio/mpeg'></source>
      </audio>
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
      <button className={styles['write-btn']} onClick={() => navigate('/recipe-posting')}>
        <AddIcon />
      </button>
      <BottomNav />
    </div>
  );
}
