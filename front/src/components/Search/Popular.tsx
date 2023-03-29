import React, { useEffect, useState } from 'react';
import styles from '@/styles/search.module.css';
import { useNavigate } from 'react-router-dom';
import { PopularType } from '@/types/search';

export default function Popular() {
  const navigate = useNavigate();

  const [popularList, setPopularList] = useState<PopularType[]>([]);

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
