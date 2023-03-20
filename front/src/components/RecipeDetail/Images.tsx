import React, { useState } from 'react';
import { RecipeImageType } from '@/components/types';
import ImageItem from '@/components/RecipeDetail/ImageItem';
import Carousel from 'react-material-ui-carousel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
interface Props {
  images: string[];
}
export default function Images({ images }: Props) {
  // 나중에 api로 받기

  return (
    <Carousel autoPlay={false} cycleNavigation={false} NextIcon={<ChevronRightIcon />} PrevIcon={<ChevronLeftIcon />}>
      {images.map((image) => (
        <ImageItem image={image} />
      ))}
    </Carousel>
  );
}
