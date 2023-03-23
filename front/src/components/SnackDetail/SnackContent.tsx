import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SnackDetailType } from '@/types/snack';
import StarIcon from '@mui/icons-material/Star';
import styles from '@/styles/snack_detail.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getSnackDetailApi } from '@/apis/api/snackDetail';
import { getSnackDetail } from '@/apis/services/snackDetail';
import { ErrorType } from '@/types/error';
import FlavorList from './FlavorList';
export default function SnackContent() {
  const { id } = useParams();
  const [snack, setSnack] = useState<SnackDetailType>({
    snackId: '0',
    image: '',
    name: '',
    sumOfStars: '0',
    numberOfParticipants: '0',
    type: {
      id: '',
      name: '',
    },
    flavors: [
      {
        id: '',
        name: '',
      },
    ],
    like: false,
    totalLikes: '',
  });

  useEffect(() => {
    // TODO: 없는 과자일 때 error 처리하기
    if (id) {
      getSnackDetailApi(id).then(getSnackDetail).then(setSnack);
    }
  }, [id]);

  return (
    <div>
      <button className={styles['purchase-btn']}>구매하러 가기</button>
      <div className={styles['snack-img-container']}>
        <img src={snack.image} alt={snack.name} />
      </div>
      <h2>{snack.name}</h2>
      <div className={styles['grade-flavors-like']}>
        <div className={styles['grade-flavors']}>
          <div className={styles['snack-grade']}>
            <StarIcon />
            <p>{snack.sumOfStars}</p>
          </div>
          <FlavorList flavors={snack.flavors} />
        </div>
        <FavoriteBorderIcon />
      </div>
    </div>
  );
}
