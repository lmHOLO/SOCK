import React from 'react';
import styles from '@/styles/nav.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
export default function TopNav() {
  const navigate = useNavigate();
  return (
    <div className={styles['top-nav-container']}>
      <button className={styles['back-btn']} onClick={() => navigate('/search')}>
        <ArrowBackIcon fontSize='large' style={{ color: 'white' }} />
      </button>
    </div>
  );
}
