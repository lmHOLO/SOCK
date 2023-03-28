import React from 'react';
import styles from '@/styles/home.module.css';
import { SnackListItemType } from '@/types/snack';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import { useNavigate } from 'react-router';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
interface Props {
  recommendSnackList: SnackListItemType[];
}
export default function Recommend({ recommendSnackList }: Props) {
  const navigate = useNavigate();
  return (
    <div className={`${styles['recommend-container']}`}>
      <h1>
        당신을 위한
        <br /> 맞춤추천
      </h1>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={styles['mySwiper']}
      >
        {recommendSnackList.map((item, index) => (
          <SwiperSlide key={index} className={styles['swiper-slide']}>
            <img src={item.image} alt={'사진'} onClick={() => navigate(`/snacks/${item.snackId}`)} />
            <p>{item.title}</p>
            {index === recommendSnackList.length - 1 && (
              <div className={styles['more-container']}>
                <p>더 추천받기</p>
                <NavigateNextIcon />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
