import React, { useEffect, useState } from 'react';
import styles from '@/styles/grid.module.css';
import { SnackDetailType } from '@/types/snack';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router';
interface Props {
  snack: SnackDetailType;
}
export default function GridSnackListItem({ snack }: Props) {
  const [starAvg, setStarAvg] = useState<number>(0);
  const navigate = useNavigate();
  const snackNavigate = (id: string): void => {
    navigate(`/snacks/${id}`);
  };
  useEffect(() => {
    setStarAvg(snack.sumOfStars / snack.numberOfParticipants);
  }, [snack]);
  return (
    <li className={styles['card-item']} onClick={() => snackNavigate(snack.snackId)}>
      <figure className={styles['card-image']}>
        <img src={snack.image} alt={snack.name} />
      </figure>
      <div>
        <p>{snack.name}</p>
        <div className={styles['snack-info']}>
          <div className={styles['snack-grade']}>
            <StarIcon />
            {snack.numberOfParticipants === 0 ? <p>0</p> : <p>{starAvg.toFixed(1)}</p>}
          </div>
          {snack.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>
      </div>
    </li>
  );
}
