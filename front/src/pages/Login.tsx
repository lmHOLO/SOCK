import React from 'react';
import LoginBtn from '@/components/Login/LoginBtn';
import styles from '@/styles/login.module.css';

export default function Login() {
  return (
    <div className={styles.page}>
      <div className={styles['golden-ticket-container']}>
        <div className={styles['golden-ticket']}></div>
      </div>
      <div className={styles['login-container']}>
        <LoginBtn />
      </div>
    </div>
  );
}
