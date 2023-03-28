import React, { useRef, useState } from 'react';
import styles from '@/styles/theme.module.css';
// Import Swiper React components
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';
import { SnackListItemType } from '@/types/snack';
import { useNavigate } from 'react-router';
interface Props {
  recommendSnackList: SnackListItemType[];
}
export default function Theme({ recommendSnackList }: Props) {
  const navigate = useNavigate();
  return (
    <div className={`${styles['theme-container']} ${styles['black']}`}>
      <h1 className={`${styles['font-white']}`}>
        코흘리며 먹던
        <br /> 추억의 과자
      </h1>
      <>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className={styles['mySwiper']}
        >
          {recommendSnackList.map((item, index) => (
            <SwiperSlide key={index} className={styles['swiper-slide']}>
              <img src={item.image} alt={'사진'} onClick={() => navigate(`/snacks/${item.snackId}`)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
}
