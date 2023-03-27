import React, { useEffect, useState } from 'react';
import styles from '@/styles/comment.module.css';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
interface Props {
  setStarPoint: React.Dispatch<React.SetStateAction<number>>;
}
export default function CommentRating({ setStarPoint }: Props) {
  let starRatingState: Array<boolean> = new Array(5).fill(false);

  const [starRatingOnOff, setStarRatingOff] = useState(starRatingState);

  function mouseOverStarRating(inx: number) {
    let tempStarRating: Array<boolean> = [];
    for (let i = 0; i < 5; i++) {
      if (i <= inx) {
        tempStarRating[i] = true;
      } else {
        tempStarRating[i] = false;
      }
    }
    setStarPoint(inx);
    setStarRatingOff(tempStarRating);
  }
  return (
    <div className={styles['star']}>
      {starRatingOnOff.map((n, index) => {
        if (starRatingOnOff[index]) {
          return (
            <div key={index}>
              <StarIcon fontSize='small' onMouseOver={() => mouseOverStarRating(index)} />
            </div>
          );
        } else {
          return (
            <div key={index}>
              <StarOutlineIcon fontSize='small' onMouseOver={() => mouseOverStarRating(index)} />
            </div>
          );
        }
      })}
    </div>
  );
}
