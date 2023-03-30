import React from 'react';
import styles from '@/styles/search.module.css';
import { useNavigate } from 'react-router-dom';
interface Props {
  popularList: { snackId: string; snackTitle: string }[];
}
export default function Popular({ popularList }: Props) {
  const navigate = useNavigate();
  return (
    <div className={styles['popular-container']}>
      <ol className={styles['popular-list']}>
        {popularList.map((item, index) => {
          return (
            <li onClick={() => navigate(`/snacks/${item.snackId}`)}>
              {index + 1}. {item.snackTitle}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
