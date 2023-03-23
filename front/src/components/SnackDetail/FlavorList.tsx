import { FlavorType } from '@/types/snack';
import React from 'react';
import FlavorListItem from './FlavorListItem';
import styles from '@/styles/snack_detail.module.css';
interface Props {
  flavors: FlavorType[];
}
export default function FlavorList({ flavors }: Props) {
  console.log(flavors);
  return (
    <ul className={styles['flavor-list-container']}>
      {flavors.map((flavor) => (
        <FlavorListItem key={flavor.id} flavor={flavor} />
      ))}
    </ul>
  );
}
