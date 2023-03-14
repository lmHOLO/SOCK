import React from 'react';
import styles from '@/styles/login.module.css';

export default function Logo() {
  return (
    <div className={styles['sock-container']}>
      <div className={styles.logo}></div>
      <div className={styles.slogan}>
        슬로건슬로건슬로건슬로건슬로건
        <br />
        슬로건슬로건슬로건슬로건
      </div>
    </div>
  );
}
