import React, { useEffect } from 'react';
import LoginBtn from '@/components/Login/LoginBtn';
// import Nickname from '@/components/Login/Nickname';
import styles from '@/styles/login.module.css';
import useMember from '@/hooks/memberHook';

export default function Login() {
  const { logout } = useMember();
  useEffect(() => {
    logout();
  }, []);
  return (
    <div className={styles.page}>
      <LoginBtn />
    </div>
  );
}
