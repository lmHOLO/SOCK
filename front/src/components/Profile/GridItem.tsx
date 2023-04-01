import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/profile.module.css';
import { MenuType, ProfileGridItemType } from '@/types/member';

interface Props {
  menu: MenuType;
  itemList: ProfileGridItemType[];
}
export default function GridItem({ menu, itemList }: Props) {
  const navigate = useNavigate();

  const navigateTo = (id: string) => {
    if (menu === 'LIKE_RECIPE' || menu === 'POST_RECIPE') {
      navigate(`/recipes/${id}`);
    }
  };
  return (
    <section className={`${styles['primary']}`}>
      <ul className={styles['card-list']}>
        {itemList &&
          itemList.map((item, index) => {
            return (
              <img
                key={index}
                src={item.image}
                alt={item.id}
                onClick={() => navigateTo(item.id)}
                className={styles['card-item']}
              />
            );
          })}
      </ul>
    </section>
  );
}
