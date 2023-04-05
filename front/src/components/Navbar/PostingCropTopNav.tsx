import React from 'react';
import styles from '@/styles/nav.module.css';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';

export default function PostingCropTopNav() {
  const navigate = useNavigate();
  return (
    <div className={styles['top-nav-container']}>
      <button className={styles['back-btn']} onClick={() => navigate(-1)}>
        <img src={require(`@/assets/home/icon_back.png`)} alt='back' className={styles['back-btn-icon']} />
      </button>
      <img className={styles['sock-logo']} src={require(`@/assets/sock-logo-color.png`)} alt='logo' />
      <div className={styles['search-btn']} onClick={() => navigate('/search')}>
        <Button variant='text'>NEXT</Button>
      </div>
    </div>
  );
}
