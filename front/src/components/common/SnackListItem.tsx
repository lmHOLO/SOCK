import React from 'react';
import { snackListItem } from '@/components/types';
import styles from '@/styles/snack_list.module.css';
interface Props {
  snack: snackListItem;
}
export default function RecommendListItem({ snack }: Props) {
  return (
    <li className={styles['snack-list-item-container']}>
      {/* <div className={styles['snack-list-item']}></div> */}
      {/* <div style={{ background: `url(${snack.image})` }} className={styles['snack-list-item']}></div> */}
      <img src={snack.image} alt={snack.title} className={styles['snack-list-item']} />
    </li>
  );
}
