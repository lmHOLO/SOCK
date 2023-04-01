import React, { useState } from 'react';
import styles from '@/styles/movie.module.css';
// Import Swiper React components
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';
import { SnackListItemType } from '@/types/snack';
import { useNavigate } from 'react-router';

// interface Props {
//   recommendSnackList: SnackListItemType[];
// }
export default function Movie() {
  const navigate = useNavigate();
  const clickEvent = () => {
    navigate('/snack-content/MOVIE');
  };

  return (
    <div className={`${styles['theme-container']} ${styles['black']}`}>
      <div className={styles['movie-main']}>
        <img src={require(`@/assets/home/movie_main.png`)} alt='movie_main' />
      </div>
      <div className={styles['movie-lego']}>
        <img src={require(`@/assets/home/movie_lego.png`)} alt='이미지' onClick={clickEvent} />
      </div>
    </div>
  );
}
