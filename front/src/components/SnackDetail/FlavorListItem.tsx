import { FlavorType } from '@/types/snack';
import React from 'react';
import styles from '@/styles/snack_detail.module.css';
interface Props {
  flavor: FlavorType;
}
export default function FlavorListItem({ flavor }: Props) {
  return (
    <li className={styles['flavor-list-item-container']}>
      <p>{flavor.name}</p>
    </li>
  );
}
