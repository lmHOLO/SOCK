import React from 'react';
import styles from '@/styles/login.module.css';

export default function Logo() {
  return (
    <div className={styles['sock-container']}>
      <div className={styles.logo}></div>
      <div className={styles.slogan}>
        <h1>내 맘에 쏙, 내 입에 쏙</h1>
        <h2>당신만을 위한 과자 추천 도우미</h2>
      </div>
    </div>
  );
}
