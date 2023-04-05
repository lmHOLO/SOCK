import React, { useEffect } from 'react';
import styles from '@/styles/home.module.css';
import { SnackListItemType } from '@/types/snack';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import { Pagination, Navigation, EffectCube } from 'swiper';
import { useNavigate } from 'react-router';
interface Props {
  recommendSnackList: SnackListItemType[];
}
export default function Recommend({ recommendSnackList }: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    let observer = new IntersectionObserver((e: any) => {
      e.forEach((item: any) => {
        if (item.isIntersecting) {
          item.target.style.opacity = 1;
        } else {
          item.target.style.opacity = 0;
        }
      });
    });
    let opacity = document.querySelectorAll('.opacity');
    observer.observe(opacity[0]);
  }, []);
  return (
    <div className={`${styles['recommend-container']} inner`}>
      <h1 className={`opacity`}>
        당신을 위한
        <br /> 맞춤추천
      </h1>
      <Swiper
        effect='cube'
        cubeEffect={{
          // shadow: true,
          // slideShadows: true,
          // shadowOffset: 20,
          // shadowScale: 0.94,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        // loop={true}
        grabCursor={true}
        // modules={[Pagination, Navigation]}
        modules={[EffectCube, Pagination, Navigation]}
        className={`${styles['mySwiper']}`}
      >
        {recommendSnackList.map((item, index) => (
          <SwiperSlide key={index} className={styles['swiper-slide']}>
            <img src={item.image} alt={item.title} onClick={() => navigate(`/snacks/${item.snackId}`)} />
            <p>{item.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
