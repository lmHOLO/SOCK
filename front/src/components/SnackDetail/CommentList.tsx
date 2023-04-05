import React, { useEffect, useState } from 'react';
import CommentListItem from './CommentListItem';
import { useParams } from 'react-router-dom';
import { getSnackReviewsAPI } from '@/apis/api/snackDetail';
import { getMyReview, getOtherReviewList } from '@/apis/services/snackDetail';
import { ReviewType } from '@/types/snack';
interface Props {
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  snackId: string;
  starAvg: number;
  setStarAvg: React.Dispatch<React.SetStateAction<number>>;
  setCommentList: React.Dispatch<React.SetStateAction<ReviewType[]>>;
  commentList: ReviewType[];
}
export default function CommentList({
  isValid,
  setIsValid,
  snackId,
  setStarAvg,
  starAvg,
  setCommentList,
  commentList,
}: Props) {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSnackReviewsAPI(id).then((data) => {
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
      });
    }
  }, [id]);
  return (
    <div>
      <ul>
        {commentList?.map((comment, index) => (
          <CommentListItem
            isValid={isValid}
            key={index}
            comment={comment}
            snackId={snackId}
            setCommentList={setCommentList}
            setIsValid={setIsValid}
            setStarAvg={setStarAvg}
            starAvg={starAvg}
          />
        ))}
      </ul>
    </div>
  );
}
