import React, { useState } from 'react';
import styles from '@/styles/retro.module.css';
// Import Swiper React components

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';
import { SnackListItemType } from '@/types/snack';
import { useNavigate } from 'react-router';
interface Props {
  recommendSnackList: SnackListItemType[];
}
export default function Retro() {
  const navigate = useNavigate();
  const clickEvent = () => {
    navigate('/snack-content/RETRO');
  };

  return (
    <div className={`${styles['theme-container']} ${styles['green']}`}>
      <div className={styles['retro-main']}>
        <img src={require(`@/assets/home/retro_green_main.png`)} alt='이미지' />
      </div>
      <div className={styles['retro-lego']}>
        <img src={require(`@/assets/home/retro_green_lego.png`)} alt='이미지' onClick={clickEvent} />
      </div>
    </div>
  );
}
