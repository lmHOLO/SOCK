import React, { useEffect, useState } from 'react';
import styles from '@/styles/comment.module.css';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
interface Props {
  star: string;
}
export default function CommentRating() {
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
    <div>
      <StarIcon className={starRatingOnOff[0]} onMouseOver={() => mouseOverStarRating(0)} />
      <StarIcon className={starRatingOnOff[1]} onMouseOver={() => mouseOverStarRating(1)} />
      <StarIcon className={starRatingOnOff[2]} onMouseOver={() => mouseOverStarRating(2)} />
      <StarIcon className={starRatingOnOff[3]} onMouseOver={() => mouseOverStarRating(3)} />
      <StarIcon className={starRatingOnOff[4]} onMouseOver={() => mouseOverStarRating(4)} />
    </div>
  );
}
