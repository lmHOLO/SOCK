import React from 'react';
import styles from '@/styles/nav.module.css';
import { useNavigate } from 'react-router';
export default function TopNav() {
  const navigate = useNavigate();
  return (
    <div className={styles['top-nav-container']}>
      <button className={styles['back-btn']} onClick={() => navigate(-1)}>
        <img src={require(`@/assets/home/icon_back.png`)} alt='back' className={styles['back-btn-icon']} />
      </button>
      <img className={styles['sock-logo']} src={require(`@/assets/sock-logo-color.png`)} alt='logo' />
      <button className={styles['btn-search']} onClick={() => navigate('/search')}>
        <img src={require(`@/assets/home/icon_search.png`)} alt='search' className={styles['search-btn-icon']} />
      </button>
    </div>
  );
}
