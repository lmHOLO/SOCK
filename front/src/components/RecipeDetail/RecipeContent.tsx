import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeDetailType } from '@/types/recipe';
import styles from '@/styles/recipe_detail.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Images from '@/components/RecipeDetail/Images';
import Tag from '@/components/RecipeDetail/Tag';
import { getRecipeDetailApi } from '@/apis/api/recipeDetail';

export default function RecipeContent() {
  const { id } = useParams();

  // TODO: id에 맞춰서 레시피 상세 데이터가져오기
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

  return (
    <div>
      <div className={styles['member-data']}>
        <img src={recipe.writerImage} alt={recipe.writerImage} />
        <p>{recipe.writerNickname}</p>
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
        <FavoriteBorderIcon />
        <p>{recipe.totalLikes}</p>
      </div>
      <h2 className={styles['recipe-title']}>{recipe.title}</h2>
      <ul className={styles['tag-list']}>
        {recipe.tag.map((item) => (
          <Tag key={item.tagId} tag={item} />
        ))}
      </ul>
      <div className={styles['recipe-content']}>{recipe.content}</div>
    </div>
  );
}
