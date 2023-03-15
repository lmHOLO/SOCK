import React from 'react';
import styles from '@/styles/login.module.css';

export default function Nickname() {
  return (
    <div className={styles['nickname-container']}>
      <h2>닉네임을 작성해주세요</h2>
      <input type='text' />
      <button>사용하기</button>
    </div>
  );
}
