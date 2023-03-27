import BottomNav from '@/components/Navbar/BottomNav';
import TopNav from '@/components/Navbar/TopNav';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeListItemType } from '@/types/recipe';
import { SnackListItemType } from '@/types/snack';
import RecipeContent from '@/components/RecipeDetail/RecipeContent';
import SnackList from '@/components/common/SnackList';
import RecipeList from '@/components/common/RecipeList';
import styles from '@/styles/recipe_detail.module.css';
import Comment from '@/components/RecipeDetail/Comment';
import { getSimilarSnackAPI } from '@/apis/api/snackDetail';
import { getContainRecipeAPI } from '@/apis/api/recipeDetail';
export default function RecipeDetail() {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSimilarSnackAPI('recipe', id).then((data) => {
        setSimilarSnackList(data);
      });
      getContainRecipeAPI('recipe', id).then((data) => {
        setContainRecipeList(data);
      });
    }
  }, [id]);
  // TODO: 나중에 api로 추천 snack, 추천 recipe 받아오기
  const [similarSnackList, setSimilarSnackList] = useState<SnackListItemType[]>([]);
  const [containRecipeList, setContainRecipeList] = useState<RecipeListItemType[]>([]);

  return (
    <div className='side-margin'>
      <TopNav />
      <RecipeContent />
      <div>
        {containRecipeList.length !== 0 && (
          <div className={styles['recipe-container']}>
            <div className={`${styles.title}`}>
              <p>레시피 추천</p>
            </div>
            {containRecipeList && <RecipeList recipeList={containRecipeList} />}
          </div>
        )}
        <div className={`${styles.title}`}>
          <p>유사한 상품</p>
        </div>
        <SnackList snackList={similarSnackList} />
      </div>
      <div>
        <div>
          <p>댓글</p>
        </div>
        <Comment />
      </div>
      <BottomNav />
    </div>
  );
}
