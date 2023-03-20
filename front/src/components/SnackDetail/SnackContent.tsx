import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SnackDetailType } from '@/types';
import StarIcon from '@mui/icons-material/Star';
import styles from '@/styles/snack_detail.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
export default function SnackContent() {
  const { id } = useParams();
  // TODO: id에 맞춰서 과자 상세 데이터가져오기
  const [snack, setSnack] = useState<SnackDetailType>({
    id: '1',
    image:
      'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/bac7/ebc98fe47179343a8fe773f1d9a912611f3e93b8271905fa5368c0f5c1a5.jpg',
    name: '앤지스 붐 치카팝 씨 쏠트 팝콘',
    sumOfStar: '0',
    numberOfParticipants: '0',
    type: {
      id: '2',
      name: '팝콘',
    },
    flavors: [
      {
        id: '334',
        name: '짭짤한맛',
      },
    ],
  });
  return (
    <div>
      <button className={styles['purchase-btn']}>구매하러 가기</button>
      <div className={styles['snack-img-container']}>
        <img src={snack.image} alt={snack.name} />
      </div>
      <h2>{snack.name}</h2>
      <div className={styles['grade-like']}>
        <div className={styles['snack-grade']}>
          <StarIcon />
          <p>{snack.sumOfStar}</p>
        </div>
        <FavoriteBorderIcon />
      </div>
    </div>
  );
}
