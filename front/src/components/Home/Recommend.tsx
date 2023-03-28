import React from 'react';
import styles from '@/styles/home.module.css';
import { SnackListItemType } from '@/types/snack';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
interface Props {
  recommendSnackList: SnackListItemType[];
}
export default function Recommend({ recommendSnackList }: Props) {
  return (
    <div className={styles['recommend-container']}>
      <h1>
        당신을 위한
        <br /> 맞춤추천
      </h1>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className='mySwiper'
      >
        {recommendSnackList.map((item, index) => (
          <SwiperSlide key={index} className={styles['swiper-slide']}>
            <img src={item.image} alt={'사진'} />
            <p>{item.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
