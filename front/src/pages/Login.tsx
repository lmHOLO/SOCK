import React from 'react';
import LoginBtn from '@/components/Login/LoginBtn';
import styles from '@/styles/login.module.css';

export default function Login() {
  return (
    <div className={styles.page}>
      <LoginBtn />
    </div>
  );
}
