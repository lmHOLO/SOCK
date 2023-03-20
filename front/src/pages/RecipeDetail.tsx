import BottomNav from '@/components/Navbar/BottomNav';
import TopNav from '@/components/Navbar/TopNav';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SnackListItemType } from '@/components/types';
import RecipeContent from '@/components/RecipeDetail/RecipeContent';
import SnackList from '@/components/common/SnackList';
import RecipeList from '@/components/common/RecipeList';
import styles from '@/styles/recipe_detail.module.css';
import Comment from '@/components/RecipeDetail/Comment';
export default function RecipeDetail() {
  const { id } = useParams();
  // TODO: 나중에 api로 추천 snack, 추천 recipe 받아오기
  const [similarSnackList, setSimilarSnackList] = useState<SnackListItemType[]>([
    {
      id: 1,
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '첫번째 과자',
    },
    {
      id: 2,
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '두번째 과자',
    },
    {
      id: 3,
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '세번째 과자',
    },
    {
      id: 4,
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '네번째 과자',
    },
    {
      id: 5,
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '다섯번째 과자',
    },
  ]);
  const [recommendRecipeList, setRecommendRecipeList] = useState<SnackListItemType[]>([
    {
      id: 1,
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      title: '첫번째 레시피',
    },
    {
      id: 2,
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      title: '두번째 레시피',
    },
    {
      id: 3,
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      title: '세번째 레시피',
    },
    {
      id: 4,
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      title: '네번째 레시피',
    },
    {
      id: 5,
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      title: '다섯번째 레시피',
    },
  ]);
  return (
    <div className='side-margin'>
      <TopNav />
      <RecipeContent />
      <div>
        <div className={styles['recipe-container']}>
          <div className={`${styles.title}`}>
            <p>레시피 추천</p>
          </div>
          <RecipeList recipeList={recommendRecipeList} />
        </div>
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
