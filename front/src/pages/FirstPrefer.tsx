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

// const getRandomNumber = (min: number, max: number, exclude: number[]): number => {
//   const range = max - min + 1;
//   let random = Math.floor(Math.random() * range) + min;

//   while (exclude.includes(random)) {
//     random = Math.floor(Math.random() * range) + min;
//   }

//   return random;
// };

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

  const [likeList, setLikeList] = useState<SnackPreferType[]>([]);
  const [dislikeList, setDislikeList] = useState<SnackPreferType[]>([]);  
  const handleSwipe = (direction: keyof SwipeCountsType, activeIndex: number) => {
    setSwipeCounts((prevCounts) => ({
      ...prevCounts,
      [direction]: prevCounts[direction] + 1,
    }));
        if (direction === "left") {
      setDislikeList((prevList) => [...prevList, firstPreferList[activeIndex]]);
    } else if (direction === "right") {
      setLikeList((prevList) => [...prevList, firstPreferList[activeIndex]]);
    }
  };


  useEffect(() => {
    console.log("likeList:", likeList);
  }, [likeList]);
  useEffect(() => {
    console.log("dislikeList:", dislikeList);
  }, [dislikeList]);

  useEffect(() => {
    console.log("Swipe counts:", swipeCounts);
  }, [swipeCounts]);

  useEffect(() => {
    console.log("usedList:", usedNumbers);
  }, [usedNumbers]);

  useEffect(() => {
    // fetch data and update state when component mounts
    firstPreferApi().then((response) => {
      console.log(response, "list of initial preference surveys");
      setFirstPreferList(response);
      console.log(firstPreferList, 'one of preferlist')
    });
  }, []
  )

  const [firstPreferList, setFirstPreferList] = useState<SnackPreferType[]>([]);
  

  const handleSlideChange = (swiper: any) => {


    // const randomNum = getRandomNumber(1, 30, usedNumbers);
    // setUsedNumbers([...usedNumbers, randomNum]);
    // swiper.slides[swiper.activeIndex].innerHTML = String(randomNum);
    const currentSlideIndex = swiper.activeIndex;
    const previousSlideIndex = swiper.previousIndex;
    const direction = currentSlideIndex > previousSlideIndex ? "right" : "left";
    // const randomIndex = getRandomNumber(0, firstPreferList.length - 1, usedNumbers);
    // const item = firstPreferList[randomIndex];
    
    
    
    // // 사용한 항목을 추가합니다.
    // setUsedNumbers((prevState) => [...prevState, firstPreferList[previousSlideIndex].snackId]);

    // // 항목을 swipe 합니다.
    // handleSwipe(direction, previousSlideIndex);




    setUsedNumbers((prevState) => [...prevState, firstPreferList[previousSlideIndex].snackId]);
    handleSwipe(direction, previousSlideIndex);

    
  };


  return (<>
        {/* <div>
      <p>Initial preference survey page</p>
      {firstPreferList.length === 0 ? (
        <p>Loading...</p>
        ) : (
          <ul>
          {firstPreferList.map((item) => (
            <li key={item.snackId}>{item.name}</li>
            ))}
        </ul>
      )}
    </div> */}
    <Swiper
    rewind={true}
    spaceBetween={30}
    navigation={true}
    modules={[Navigation]}
    pagination={{
      clickable: true,
    }}
    onSlideChange={handleSlideChange}>
      {firstPreferList
      .filter((item) => !usedNumbers.includes(item.snackId))
      .map((item) => (
        <SwiperSlide key={item.snackId}>{item.name}</SwiperSlide>
        ))}
      {/* {[...Array(30)].map((_, index) => (
        <SwiperSlide key={index}>{index + 1}</SwiperSlide>
        ))} */}
    </Swiper>
        </>
  );
};
