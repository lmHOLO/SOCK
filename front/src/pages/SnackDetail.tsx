import BottomNav from '@/components/Navbar/BottomNav';
import TopNav from '@/components/Navbar/TopNav';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeListItemType } from '@/types/recipe';
import { SnackListItemType } from '@/types/snack';
import SnackContent from '@/components/SnackDetail/SnackContent';
import SnackList from '@/components/common/SnackList';
import RecipeList from '@/components/common/RecipeList';
import styles from '@/styles/snack_detail.module.css';
import Comment from '@/components/SnackDetail/Comment';
import { getSimilarSnackAPI } from '@/apis/api/snackDetail';
import { getContainRecipeAPI } from '@/apis/api/recipeDetail';
export default function SnackDetail() {
  const { id } = useParams();

  const [starAvg, setStarAvg] = useState<number>(0);

  useEffect(() => {
    if (id) {
      getSimilarSnackAPI('snack', id).then((data) => {
        setSimilarSnackList(data);
      });
      getContainRecipeAPI('snack', id).then((data) => {
        setContainRecipeList(data);
      });
    }
  }, [id]);

  const [similarSnackList, setSimilarSnackList] = useState<SnackListItemType[]>([]);
  const [containRecipeList, setContainRecipeList] = useState<RecipeListItemType[]>([]);
  return (
    <div className='side-margin'>
      <TopNav />
      <SnackContent setStarAvg={setStarAvg} starAvg={starAvg} />
      <div>
        <div className={`${styles.title}`}>
          <p>유사한 상품</p>
        </div>
        <SnackList snackList={similarSnackList} />
      </div>
      {containRecipeList.length !== 0 && (
        <div className={styles['recipe-container']}>
          <div className={`${styles.title}`}>
            <p>레시피 추천</p>
          </div>
          {containRecipeList && <RecipeList recipeList={containRecipeList} />}
        </div>
      )}
      <div>
        <div className={styles[`snack-comment`]}>
          <p>댓글</p>
        </div>
        <Comment setStarAvg={setStarAvg} starAvg={starAvg} />
      </div>
      <BottomNav />
    </div>
  );
}
