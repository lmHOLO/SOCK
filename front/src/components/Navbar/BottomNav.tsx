import React, { useEffect } from 'react';
import styles from '@/styles/nav.module.css';
import useMember from '@/hooks/memberHook';
import { useNavigate } from 'react-router';
export default function BottomNav() {
  const navigate = useNavigate();
  const { memberData, isLoggedIn } = useMember();
  useEffect(() => {
    !isLoggedIn && !memberData.nickname && navigate(`/login`);
  });
  const navigateTo = (name: string) => {
    navigate(`/${name}`);
  };
  return (
    <div className={styles['bottom-nav-container']}>
      <button className={styles['menu-btn']} onClick={() => navigateTo('snacks')}>
        <div className={styles['menu-content']}>
          <img src={require(`@/assets/home/icon_snack.png`)} alt='event' />
          <p>SNACK</p>
        </div>
      </button>
      <button className={styles['menu-btn']} onClick={() => navigateTo('recipes')}>
        <div className={styles['menu-content']}>
          <img src={require(`@/assets/home/icon_recipe.png`)} alt='event' />
          <p>RECIPE</p>
        </div>
      </button>
      <button className={styles['menu-btn']} onClick={() => navigateTo('')}>
        <div className={styles['menu-content']}>
          <img src={require(`@/assets/home/icon_home.png`)} alt='event' />
          <p>HOME</p>
        </div>
      </button>
      <button className={styles['menu-btn']} onClick={() => navigateTo('event')}>
        <div className={styles['menu-content']}>
          <img src={require(`@/assets/home/icon_event.png`)} alt='event' />
          <p>EVENT</p>
        </div>
      </button>
      <button className={styles['menu-btn']} onClick={() => navigateTo(`profile/${memberData.id}`)}>
        <div className={styles['menu-content']}>
          <img className={styles['bottom-nav-profile']} src={memberData.profile.image} alt={memberData.nickname} />
          <p>MY</p>
        </div>
      </button>
    </div>
  );
}
