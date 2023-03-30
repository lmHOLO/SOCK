import React from 'react';
import { ReviewType } from '@/types/snack';
import styles from '@/styles/comment.module.css';
import StarRating from './StarRating';
import useMember from '@/hooks/memberHook';

import { deleteSnackReviewAPI, getSnackReviewsAPI } from '@/apis/api/snackDetail';
import { getMyReview, getOtherReviewList } from '@/apis/services/snackDetail';

interface Props {
  isValid: boolean;
  comment: ReviewType;
  snackId: string;
  setCommentList: React.Dispatch<React.SetStateAction<ReviewType[]>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentListItem({ isValid, comment, snackId, setCommentList, setIsValid }: Props) {
  const { memberData } = useMember();

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
      });
    }
  };

  return (
    <li className={styles['comment-item']}>
      <div className={styles['member-data']}>
        <img src={comment.writer.image} alt={comment.writer.image} />
        <p>{comment.writer.nickname}</p>
      </div>
      <div className={styles['comment-data']}>
        <StarRating star={comment.star} />
        <p>{comment.createdDate}</p>
      </div>
      {!isValid && memberData.id === comment.writer.writerId && (
        <button className={styles['delete-btn']} onClick={reviewDeleteEvent}>
          삭제
        </button>
      )}
      <p>{comment.content}</p>
    </li>
  );
}
