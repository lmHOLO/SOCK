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

  // TODO: 추천 recipe 받아오기
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
  const [containRecipeList, setContainRecipeList] = useState<RecipeListItemType[]>([
    {
      recipeId: '1',
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      title: '첫번째 레시피',
    },
    {
      recipeId: '2',
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      title: '두번째 레시피',
    },
    {
      recipeId: '3',
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      title: '세번째 레시피',
    },
    {
      recipeId: '4',
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      title: '네번째 레시피',
    },
    {
      recipeId: '5',
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      title: '다섯번째 레시피',
    },
  ]);
  return (
    <div className='side-margin'>
      <TopNav />
      <SnackContent />
      <div>
        <div className={`${styles.title}`}>
          <p>유사한 상품</p>
        </div>
        <SnackList snackList={similarSnackList} />
      </div>
      <div className={styles['recipe-container']}>
        <div className={`${styles.title}`}>
          <p>레시피 추천</p>
        </div>
        {containRecipeList && <RecipeList recipeList={containRecipeList} />}
        {!containRecipeList && <p>레시피업따</p>}
      </div>
      <div>
        <div>
          <p>댓글</p>
        </div>
        <Comment />
        {/* 댓글 input */}
        {/* 댓글리스트 */}
      </div>
      <BottomNav />
    </div>
  );
}
