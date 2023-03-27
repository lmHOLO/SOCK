import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '@/styles/recipe_posting.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

interface Props {
  originFiles: File[];
}
export default function Images({ originFiles }: Props) {
  // 나중에 api로 받기
  return (
    <>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={styles['mySwiper']}
      >
        {originFiles.map((file, index) => (
          <SwiperSlide key={index}>
            <img src={URL.createObjectURL(file)} alt={'사진'} className={styles['swiper-slide']} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
