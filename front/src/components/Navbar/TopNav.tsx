import React from 'react';
import styles from '@/styles/nav.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';
export default function TopNav() {
  const navigate = useNavigate();
  return (
    <div className={styles['top-nav-container']}>
      <button className={styles['search-btn']} onClick={() => navigate('/search')}>
        <SearchIcon fontSize='large' style={{ color: 'white' }} />
      </button>
    </div>
  );
}
