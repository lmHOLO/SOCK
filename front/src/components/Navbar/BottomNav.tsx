import React, { useEffect } from 'react';
import styles from '@/styles/nav.module.css';
import HomeIcon from '@mui/icons-material/Home';
import CookieIcon from '@mui/icons-material/Cookie';
import CakeIcon from '@mui/icons-material/Cake';
import useMember from '@/hooks/memberHook';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from 'react-router';
export default function BottomNav() {
  const navigate = useNavigate();
  const { memberData } = useMember();
  useEffect(() => {});
  const navigateTo = (name: string) => {
    navigate(`/${name}`);
  };
  return (
    <div className={styles['bottom-nav-container']}>
      <button className={styles['menu-btn']} onClick={() => navigateTo('snacks/1')}>
        <div className={styles['menu-content']}>
          <CookieIcon fontSize='large' style={{ color: 'white' }} />
          <p>SNACK</p>
        </div>
      </button>
      <button className={styles['menu-btn']} onClick={() => navigateTo('recipe')}>
        <div className={styles['menu-content']}>
          <ReceiptLongIcon fontSize='large' style={{ color: 'white' }} />
          <p>RECIPE</p>
        </div>
      </button>
      <button className={styles['menu-btn']} onClick={() => navigateTo('')}>
        <div className={styles['menu-content']}>
          <HomeIcon fontSize='large' style={{ color: 'white' }} />
          <p>HOME</p>
        </div>
      </button>
      <button className={styles['menu-btn']} onClick={() => navigateTo('snack')}>
        <div className={styles['menu-content']}>
          <CakeIcon fontSize='large' style={{ color: 'white' }} />
          <p>EVENT</p>
        </div>
      </button>
      <button className={styles['menu-btn']} onClick={() => navigateTo('my')}>
        <div className={styles['menu-content']}>
          <img src={memberData.profile.image} alt={memberData.nickname} />
          <p>MY</p>
        </div>
      </button>
    </div>
  );
}
