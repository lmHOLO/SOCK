import React, { useEffect, useState } from "react";
import { authApiInstance } from '@/apis/axiosConfig';
import { firstPreferApi } from '@/apis/api/firstprefer';
import { SnackPreferType } from '@/types/snack';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "swiper/swiper.min.css";

const getRandomNumber = (min: number, max: number, exclude: number[]): number => {
  const range = max - min + 1;
  let random = Math.floor(Math.random() * range) + min;

  while (exclude.includes(random)) {
    random = Math.floor(Math.random() * range) + min;
  }

  return random;
};

interface SwipeCountsType {
  left: number;
  right: number;
  up: number;
  down: number;
}

export default function FirstPrefer() {
  const [usedNumbers, setUsedNumbers] = useState<number[]>([]);
  const [swipeCounts, setSwipeCounts] = useState<SwipeCountsType>({
    left: 0,
    right: 0,
    up: 0,
    down: 0,
  });

  const handleSwipe = (direction: keyof SwipeCountsType) => {
    setSwipeCounts((prevCounts) => ({
      ...prevCounts,
      [direction]: prevCounts[direction] + 1,
    }));
  };

  useEffect(() => {
    console.log("Swipe counts:", swipeCounts);
  }, [swipeCounts]);

  const handleSlideChange = (swiper: any) => {
    const randomNum = getRandomNumber(1, 30, usedNumbers);
    setUsedNumbers([...usedNumbers, randomNum]);
    swiper.slides[swiper.activeIndex].innerHTML = String(randomNum);
    const currentSlideIndex = swiper.activeIndex;
    const previousSlideIndex = swiper.previousIndex;
    const direction = currentSlideIndex > previousSlideIndex ? "left" : "right";
    handleSwipe(direction);
  };

  return (
    <Swiper
    spaceBetween={30}
    navigation={true}
    modules={[Navigation]}
    pagination={{
      clickable: true,
    }}
    onSlideChange={handleSlideChange}>
      {[...Array(30)].map((_, index) => (
        <SwiperSlide key={index}>{index + 1}</SwiperSlide>
      ))}
    </Swiper>
  );
};
