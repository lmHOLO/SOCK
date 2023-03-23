import BottomNav from '@/components/Navbar/BottomNav';
import TopNav from '@/components/Navbar/TopNav';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeListItemType, SnackListItemType } from '@/types';
import SnackContent from '@/components/SnackDetail/SnackContent';
import SnackList from '@/components/common/SnackList';
import RecipeList from '@/components/common/RecipeList';
import styles from '@/styles/snack_detail.module.css';
import Comment from '@/components/SnackDetail/Comment';
import { getSimilarSnackAPI } from '@/apis/api/snackDetail';
export default function SnackDetail() {
  const { id } = useParams();

  // TODO: 추천 recipe 받아오기
  useEffect(() => {
    if (id) {
      getSimilarSnackAPI('snack', id).then((data) => {
        console.log('similar', data);
        setSimilarSnackList(data);
      });
    }
  }, [id]);

  const [similarSnackList, setSimilarSnackList] = useState<SnackListItemType[]>([]);
  const [recommendRecipeList, setRecommendRecipeList] = useState<RecipeListItemType[]>([
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
        <RecipeList recipeList={recommendRecipeList} />
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
