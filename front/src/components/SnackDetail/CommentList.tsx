import React, { useEffect, useState } from 'react';
import CommentListItem from './CommentListItem';
import { useParams } from 'react-router-dom';
import { getSnackReviewsAPI } from '@/apis/api/snackDetail';
import { getMyReview, getOtherReviewList } from '@/apis/services/snackDetail';
import { ReviewType } from '@/types/snack';
interface Props {
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CommentList({ isValid, setIsValid }: Props) {
  const [commentList, setCommentList] = useState<ReviewType[]>([]);
  let first = true; // 첫페이지인가
  let last = true; // 마지막페이지
  let number = 0; // 현재 페이지
  let totalPages: 0; // 총 페이지 개수
  let totalElements: 0; // 총 댓글 개수

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSnackReviewsAPI(id).then((data) => {
        // console.log('data', data);
        const myReviewList = getMyReview(data);
        const otherReviewList = getOtherReviewList(data);

        if (myReviewList != null && otherReviewList != null) {
          // console.log(myReviewList);
          const newList: ReviewType[] = [...[myReviewList], ...otherReviewList];
          setCommentList(newList);
        } else {
          setIsValid(true);
          const newList: ReviewType[] = [...otherReviewList];
          setCommentList(newList);
        }

        // console.log('useEffect ', commentList);
      });
    }
  }, [id]);
  return (
    <div>
      <ul>
        {commentList?.map((comment, index) => (
          <CommentListItem isValid={isValid} key={index} comment={comment} />
        ))}
      </ul>
    </div>
  );
}
