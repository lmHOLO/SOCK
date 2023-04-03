import React from 'react';
import styles from '@/styles/login.module.css';

export default function Logo() {
  return (
    <div className={`${styles['sock-container']}`}>
      <div className={`${styles['logo-img-container']}`}>
        <img src={require(`@/assets/sock-logo-color-crop.png`)} alt='logo' className={`${styles['logo-img']}`} />
      </div>
      <div className={`${styles['slogan']}`}>
        <div className={`${styles['main-slogan']}`}>내 맘에 쏙, 내 입에 쏙</div>
        <div className={`${styles['sub-slogan']}`}>당신만을 위한 과자 추천</div>
        <br />
      </div>
    </div>
  );
}
