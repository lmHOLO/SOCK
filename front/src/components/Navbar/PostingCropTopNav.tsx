import React from 'react';
import styles from '@/styles/nav.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';

export default function PostingCropTopNav() {
  const navigate = useNavigate();
  return (
    <div className={styles['top-nav-container']}>
      <button className={styles['back-btn']} onClick={() => navigate('/search')}>
        <ArrowBackIcon fontSize='large' style={{ color: 'white' }} />
      </button>
      <div className={styles['search-btn']} onClick={() => navigate('/search')}>
        <Button variant='text'>NEXT</Button>
      </div>
    </div>
  );
}
