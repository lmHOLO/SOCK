import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SnackDetailType } from '@/types/snack';
import StarIcon from '@mui/icons-material/Star';
import styles from '@/styles/snack_detail.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deleteSnackLikeAPI, getSnackDetailApi, postSnackLikeAPI } from '@/apis/api/snackDetail';
import { getSnackDetail } from '@/apis/services/snackDetail';
import { purchaseSnackAPI } from '@/apis/api/snackDetail';
import { ErrorType } from '@/types/error';
import FlavorList from './FlavorList';

interface Props {
  starAvg: number;
  setStarAvg: React.Dispatch<React.SetStateAction<number>>;
}

export default function SnackContent({ setStarAvg, starAvg }: Props) {
  const { id } = useParams();

  const [snack, setSnack] = useState<SnackDetailType>({
    snackId: '0',
    image: '',
    name: '',
    sumOfStars: 0,
    numberOfParticipants: 0,
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

  const handleClick = () => {
    if (id) {
      if (!snack.like) {
        postSnackLikeAPI(id).then(console.log);
        setSnack((prevState) => ({
          ...prevState,
          like: true,
        }));
        return;
      }
      deleteSnackLikeAPI(id).then(console.log);
      setSnack((prevState) => ({
        ...prevState,
        like: false,
      }));
    }
  };

  useEffect(() => {
    // TODO: 없는 과자일 때 error 처리하기
    if (id) {
      getSnackDetailApi(id)
        .then(getSnackDetail)
        .then((data) => {
          setSnack(data);
        });
    }
  }, [id]);
  useEffect(() => {
    setStarAvg(snack.sumOfStars / snack.numberOfParticipants);
  }, [snack]);

  const purchaseEvent = () => {
    purchaseSnackAPI(snack.snackId);
    const url = `https://www.coupang.com/np/search?component=&q=${snack.name}&channel=user`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <button className={styles['purchase-btn']} onClick={purchaseEvent}>
        구매하러 가기
      </button>
      <div className={styles['snack-img-container']}>
        <img src={snack.image} alt={snack.name} />
      </div>
      <h2>{snack.name}</h2>
      <div className={styles['grade-flavors-like']}>
        <div className={styles['grade-flavors']}>
          <div className={styles['snack-grade']}>
            <StarIcon />
            {snack.numberOfParticipants === 0 || starAvg == 0 ? <p>0</p> : <p>{starAvg.toFixed(1)}</p>}
          </div>
          <FlavorList flavors={snack.flavors} />
        </div>
        {snack.like ? <FavoriteIcon onClick={handleClick} /> : <FavoriteBorderIcon onClick={handleClick} />}
      </div>
    </div>
  );
}
