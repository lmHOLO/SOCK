import { FlavorType } from '@/types/snack';
import React from 'react';
import styles from '@/styles/snack_detail.module.css';
interface Props {
  flavor: FlavorType;
}
export default function FlavorListItem({ flavor }: Props) {
  return (
    <li className={styles['flavor-list-item-container']}>
      {flavor.name === '달콤한맛' && (
        <img
          src={'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fsweet.png?alt=media'}
          alt='달콤한맛'
        />
      )}
      {flavor.name === '고소한맛' && (
        <img
          src={'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fgoso.png?alt=media'}
          alt='고소한맛'
        />
      )}
      {flavor.name === '새콤한맛' && (
        <img
          src={'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fsour.png?alt=media'}
          alt='새콤한맛'
        />
      )}
      {flavor.name === '짭짤한맛' && (
        <img
          src={'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fsalty.png?alt=media'}
          alt='짭짤한맛'
        />
      )}
      {flavor.name === '매콤한맛' && (
        <img
          src={'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fspicy.png?alt=media'}
          alt='매콤한맛'
        />
      )}
      <p>{flavor.name}</p>
    </li>
  );
}
