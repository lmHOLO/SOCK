import React from 'react';
import styles from '@/styles/login.module.css';

export default function LoginBtn() {
  const kakaoLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    console.log(`${process.env.REACT_APP_API_BASE_URL}`);
    window.open(
      `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorize/kakao?redirect_uri=${process.env.REACT_APP_OAUTH2_REDIRECT_URI}`,
    );
  };
  const googleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    window.open(
      `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorize/google?redirect_uri=${process.env.REACT_APP_OAUTH2_REDIRECT_URI}`,
    );
  };
  return (
    <div className={styles['login-btns']}>
      <button onClick={kakaoLogin} className={`${styles['kakao-btn']}`}>
        <div className={styles['login-btn-contant']}>
          <div className={`${styles['login-btn-img']}`}></div>
          <p>카카오로 로그인하기</p>
        </div>
      </button>
      <button className={`${styles['naver-btn']}`}>
        <div className={styles['login-btn-contant']}>
          <div className={`${styles['login-btn-img']}`}></div>
          <p>네이버로 로그인하기</p>
        </div>
      </button>
      <button className={`${styles['google-btn']}`} onClick={googleLogin}>
        <div className={styles['login-btn-contant']}>
          <div className={styles['login-btn-img']}></div>
          <p>구글로 로그인하기</p>
        </div>
      </button>
    </div>
  );
}
