import React from 'react';
import useMember from '@/hooks/memberHook';
import { MemberProfileType, MenuType } from '@/types/member';
import { useParams } from 'react-router-dom';
import styles from '@/styles/profile.module.css';
interface Props {
  menu: MenuType;
  member: MemberProfileType;
  handleMenuClick: (menu: MenuType) => void;
}
export default function Menu({ menu, handleMenuClick }: Props) {
  const { memberData } = useMember();
  const { id } = useParams();

  return (
    <div className={styles['menu']}>
      <button
        className={menu === 'POST_RECIPE' ? `${styles['menu-active']}` : `${styles['menu-not-active']}`}
        onClick={() => handleMenuClick('POST_RECIPE')}
      >
        RECIPES
      </button>
      <button
        className={menu === 'LIKE_SNACK' ? `${styles['menu-active']}` : `${styles['menu-not-active']}`}
        onClick={() => handleMenuClick('LIKE_SNACK')}
      >
        관심있는 과자
      </button>
      {memberData.id == id && (
        <button
          className={menu === 'LIKE_RECIPE' ? `${styles['menu-active']}` : `${styles['menu-not-active']}`}
          onClick={() => handleMenuClick('LIKE_RECIPE')}
        >
          좋아요한 레시피
        </button>
      )}
    </div>
  );
}
