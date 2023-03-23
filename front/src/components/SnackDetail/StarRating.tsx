import React, { useEffect, useState } from 'react';
import styles from '@/styles/comment.module.css';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
interface Props {
  star: number;
}
export default function StarRating({ star }: Props) {
  let starRatingState: Array<string> = [];

  const [starRatingOnOff, setStarRatingOff] = useState(starRatingState);

  function mouseOverStarRating(inx: number) {
    let tempStarRating: Array<string> = [];
    for (let i = 0; i < 5; i++) {
      if (i < inx) {
        tempStarRating.push('item-rating pointer filled');
      } else {
        tempStarRating.push('item-rating pointer unfilled');
      }
    }
    setStarRatingOff(tempStarRating);
  }

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      starRatingState.push('item-rating pointer unfilled');
    }
    setStarRatingOff(starRatingState);
  }, []);
  return (
    <div className={styles['star']}>
      {[...Array(5)].map((n, index) => {
        if (index > star) {
          return <StarOutlineIcon fontSize='small' />;
        } else {
          return <StarIcon fontSize='small' />;
        }
      })}
    </div>
  );
}
