import React from 'react';
import styles from '@/styles/grid.module.css';
import { SnackDetailType } from '@/types/snack';
import GridSnackListItem from './SnackGridListItem';
interface Props {
  snackList: SnackDetailType[];
}
export default function SnackGridList({ snackList }: Props) {
  return (
    <section className={`${styles['primary']} side-margin`}>
      <ul className={styles['card-list']}>
        {snackList && snackList.map((snack, index) => <GridSnackListItem snack={snack} key={index} />)}
      </ul>
    </section>
  );
}
