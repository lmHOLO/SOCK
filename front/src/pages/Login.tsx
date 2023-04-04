import React, { useEffect } from 'react';
import LoginBtn from '@/components/Login/LoginBtn';
// import Nickname from '@/components/Login/Nickname';
import styles from '@/styles/login.module.css';
import useMember from '@/hooks/memberHook';
import Logo from '@/components/Login/Logo';

export default function Login() {
  const { logout } = useMember();
  useEffect(() => {
    logout();
    localStorage.removeItem('token');
  }, []);
  return (
    <div className={styles.page}>
      <Logo />
      <LoginBtn />
    </div>
  );
}
