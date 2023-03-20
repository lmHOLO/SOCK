import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeDetailType } from '@/components/types';
import styles from '@/styles/recipe_detail.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Images from '@/components/RecipeDetail/Images';
import Tag from '@/components/RecipeDetail/Tag';

export default function RecipeContent() {
  const { id } = useParams();
  // TODO: id에 맞춰서 레시피 상세 데이터가져오기
  const [recipe, setRecipe] = useState<RecipeDetailType>({
    id: '1',
    memberId: '1',
    memberNickname: 'chipslover',
    memberImage:
      'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/bac7/ebc98fe47179343a8fe773f1d9a912611f3e93b8271905fa5368c0f5c1a5.jpg',

    images: [
      'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/bac7/ebc98fe47179343a8fe773f1d9a912611f3e93b8271905fa5368c0f5c1a5.jpg',
      'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/bac7/ebc98fe47179343a8fe773f1d9a912611f3e93b8271905fa5368c0f5c1a5.jpg',
    ],
    title: '감자칩을 나초처럼 만들어 먹어봐요오오',
    likeCnt: '0',
    content: '포카칩을 준비합니다',
    tags: [
      {
        id: '1',
        image:
          'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/bac7/ebc98fe47179343a8fe773f1d9a912611f3e93b8271905fa5368c0f5c1a5.jpg',
        name: '포카칩 어니언맛',
      },
      {
        id: '2',
        image:
          'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/bac7/ebc98fe47179343a8fe773f1d9a912611f3e93b8271905fa5368c0f5c1a5.jpg',
        name: '포카칩 언니언맛',
      },
      {
        id: '3',
        image:
          'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/bac7/ebc98fe47179343a8fe773f1d9a912611f3e93b8271905fa5368c0f5c1a5.jpg',
        name: '포카칩 아니언맛',
      },
    ],
  });
  return (
    <div>
      <div className={styles['member-data']}>
        <img src={recipe.memberImage} alt={recipe.memberNickname} />
        <p>{recipe.memberNickname}</p>
      </div>
      <div>
        <Images images={recipe.images} />
      </div>
      <div className={styles['recipe-like']}>
        <FavoriteBorderIcon />
        <p>{recipe.likeCnt}</p>
      </div>
      <h2>{recipe.title}</h2>
      <ul className={styles['tag-list']}>
        {recipe.tags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </ul>
      <div className={styles['recipe-content']}>{recipe.content}</div>
    </div>
  );
}
