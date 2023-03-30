import React from 'react';
import styles from '@/styles/login.module.css';

export default function LoginBtn() {
  const socialLogin = (name: String) => {
    window.location.replace(
      `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorize/${name}?redirect_uri=${process.env.REACT_APP_OAUTH2_REDIRECT_URI}`,
    );
  };
  return (
    <div className={styles['login-container']}>
      <button onClick={() => socialLogin('kakao')} className={`${styles['kakao-btn']}`}>
        <div className={`${styles['login-btn-img']}`}></div>
        <p>카카오로 로그인하기</p>
      </button>
      <button onClick={() => socialLogin('naver')} className={`${styles['naver-btn']}`}>
        <div className={`${styles['login-btn-img']}`}></div>
        <p>네이버로 로그인하기</p>
      </button>
      <button onClick={() => socialLogin('google')} className={`${styles['google-btn']}`}>
        <div className={styles['login-btn-img']}></div>
        <p>구글로 로그인하기</p>
      </button>
    </div>
  );
}
