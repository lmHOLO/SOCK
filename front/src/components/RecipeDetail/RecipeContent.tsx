import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeDetailType } from '@/types/recipe';
import styles from '@/styles/recipe_detail.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Images from '@/components/RecipeDetail/Images';
import Tag from '@/components/RecipeDetail/Tag';
import { getRecipeDetailApi, postRecipeLikeAPI, deleteRecipeLikeAPI } from '@/apis/api/recipeDetail';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PositionedMenu from './PositionedMenu';

import useMember from '@/hooks/memberHook';

export default function RecipeContent() {
  const { id } = useParams();
  const { memberData } = useMember();

  const [recipe, setRecipe] = useState<RecipeDetailType>({
    recipeId: '',
    createdDate: '',
    writerId: '',
    title: '',
    writerNickname: '',
    writerImage: '',
    sbti: '',
    grade: '',
    recipeImages: [
      {
        imageId: '',
        recipeImage: '',
      },
    ],
    content: '',
    tag: [],
    like: false,
    totalLikes: 0,
  });
  useEffect(() => {
    if (id) {
      getRecipeDetailApi(id).then((data) => {
        setRecipe(data);
      });
    }
  }, [id]);

  const likeClickEvent = () => {
    if (id) {
      if (!recipe.like) {
        postRecipeLikeAPI(id).then(reCall);
      } else {
        deleteRecipeLikeAPI(id).then(reCall);
      }
    }
  };

  const reCall = () => {
    if (id) {
      getRecipeDetailApi(id).then((data) => {
        setRecipe(data);
      });
    }
  };

  return (
    <div>
      <div className={styles['top-bar']}>
        <div className={styles['member-data']}>
          <img src={recipe.writerImage} alt={recipe.writerImage} />
          <p>{recipe.writerNickname}</p>
        </div>
        <div className={styles['more-btn']}>{memberData.id === recipe.writerId && <PositionedMenu />}</div>
        {/* <MoreHorizIcon className={styles['more-btn']} /> */}
      </div>
      <div>
        <Swiper
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className={styles['mySwiper']}
        >
          {recipe.recipeImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image.recipeImage} alt={'사진'} className={styles['swiper-slide']} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <Images images={recipe.recipeImages} /> */}
      </div>
      <div className={styles['recipe-like']}>
        {recipe.like ? <FavoriteIcon onClick={likeClickEvent} /> : <FavoriteBorderIcon onClick={likeClickEvent} />}
        <p>{recipe.totalLikes}</p>
      </div>
      <h2 className={styles['recipe-title']}>{recipe.title}</h2>
      <ul className={styles['tag-list']}>
        {recipe.tag.map((item) => (
          <Tag key={item.tagId} tag={item} />
        ))}
      </ul>
      <pre className={styles['recipe-content']}>{recipe.content}</pre>
    </div>
  );
}
