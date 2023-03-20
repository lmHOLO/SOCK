import React, { useState } from 'react';
import { RecipeImageType } from '@/components/types';
import ImageItem from '@/components/RecipeDetail/ImageItem';
import Carousel from 'react-material-ui-carousel';
export default function Images() {
  // 나중에 api로 받기
  const [recipeImageList, setRecipeImageList] = useState<RecipeImageType[]>([
    {
      image: 'https://i.postimg.cc/DypC9rTC/2019-10-01-155730.jpg',
    },
    {
      image: 'https://i.postimg.cc/mD4VYVYr/2020-10-28-134358.jpg',
    },
  ]);
  return (
    <Carousel>
      {recipeImageList.map((image, index) => (
        <ImageItem key={index} image={image} />
      ))}
    </Carousel>
  );
}
