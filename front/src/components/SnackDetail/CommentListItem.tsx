import React from 'react';
import { ReviewType } from '@/types/snack';
import styles from '@/styles/comment.module.css';
import StarRating from './StarRating';
import useMember from '@/hooks/memberHook';

import { deleteSnackReviewAPI, getSnackReviewsAPI, getSnackDetailApi } from '@/apis/api/snackDetail';
import { getMyReview, getOtherReviewList } from '@/apis/services/snackDetail';
import { getGradeImage, getSbtiImage } from '@/utils/memberInfo';

interface Props {
  isValid: boolean;
  comment: ReviewType;
  snackId: string;
  setCommentList: React.Dispatch<React.SetStateAction<ReviewType[]>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  starAvg: number;
  setStarAvg: React.Dispatch<React.SetStateAction<number>>;
}

export default function CommentListItem({
  isValid,
  comment,
  snackId,
  setCommentList,
  setIsValid,
  setStarAvg,
  starAvg,
}: Props) {
  const { memberData } = useMember();
  const gradeImage = getGradeImage(comment.writer.grade);
  const sbtiImage = getSbtiImage(comment.writer.sbti);
  const reviewDeleteEvent = () => {
    if (comment) {
      deleteSnackReviewAPI(snackId).then(() => {
        getSnackReviewsAPI(snackId).then((data) => {
          const myReviewList = getMyReview(data);
          const otherReviewList = getOtherReviewList(data);

          if (myReviewList != null && otherReviewList != null) {
            const newList: ReviewType[] = [...[myReviewList], ...otherReviewList];
            setCommentList(newList);
          } else {
            setIsValid(true);
            const newList: ReviewType[] = [...otherReviewList];
            setCommentList(newList);
          }

          setIsValid(true);
        });

        getSnackDetailApi(snackId).then((data) => {
          if (data.numberOfParticipants == 0) setStarAvg(0);
          else setStarAvg(data.sumOfStars / data.numberOfParticipants);
        });
      });
    }
  };

  const timeStr = comment.createdDate; // 예제 시간 문자열
  // 정규식 사용하여 T와 ss 제거
  const newTimeStr = timeStr.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1');

  return (
    <li className={styles['comment-item']}>
      <div className={styles['member-data']}>
        <div className={styles['member-image']}>
          <img src={comment.writer.image} alt={comment.writer.image} />
        </div>
        <p>{comment.writer.nickname}</p>
        <div className={styles['grade-sbti']}>
          {gradeImage && <img src={`${gradeImage}`} alt={comment.writer.grade} />}
          {sbtiImage && <img src={`${sbtiImage}`} alt={comment.writer.sbti} />}
        </div>
        <div className={styles['time-data']}>
          <p>{newTimeStr}</p>
        </div>
      </div>
      {!isValid && memberData.id === comment.writer.writerId && (
        <button className={styles['delete-btn']} onClick={reviewDeleteEvent}>
          삭제
        </button>
      )}

      <div className={styles['comment-data']}>
        <StarRating star={comment.star} />
      </div>
      <pre className={styles['comment-content']}>{comment.content}</pre>
    </li>
  );
}
