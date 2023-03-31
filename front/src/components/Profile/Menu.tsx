import useMember from '@/hooks/memberHook';
import { MemberProfileType, MenuType } from '@/types/member';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '@/styles/profile.module.css';
interface Props {
  menu: MenuType;
  member: MemberProfileType;
  setMenu: React.Dispatch<React.SetStateAction<MenuType>>;
}
export default function Menu({ menu, setMenu }: Props) {
  const { memberData } = useMember();
  const { id } = useParams();
  const handleMenu = async (menu: MenuType) => {
    setMenu(menu);
  };

  return (
    <div className={styles['menu']}>
      <button
        className={menu === 'POST_RECIPE' ? `${styles['menu-active']}` : `${styles['menu-not-active']}`}
        onClick={() => handleMenu('POST_RECIPE')}
      >
        RECIPES
      </button>
      <button
        className={menu === 'LIKE_SNACK' ? `${styles['menu-active']}` : `${styles['menu-not-active']}`}
        onClick={() => handleMenu('LIKE_SNACK')}
      >
        LIKED SNACKS
      </button>
      {memberData.id === id && (
        <button
          className={menu === 'LIKE_RECIPE' ? `${styles['menu-active']}` : `${styles['menu-not-active']}`}
          onClick={() => handleMenu('LIKE_RECIPE')}
        >
          LIKED RECIPES
        </button>
      )}
    </div>
  );
}
