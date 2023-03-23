import React, { useEffect, useState } from 'react';
import { CommentType } from '@/types';
import CommentListItem from './CommentListItem';
import { useParams } from 'react-router-dom';
import { getSnackReviewsAPI } from '@/apis/api/snackDetail';
import { getMyReview, getOtherReviewList } from '@/apis/services/snackDetail';
import { ReviewType } from '@/types/snack';

export default function CommentList() {
  const [commentList, setCommentList] = useState<CommentType[]>([
    /*     {
      id: '2',
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      nickname: 'oreooo',
      content: '오레오를 좋아하는 저는 별로 맛있지 않았어요.',
      sumOfStar: '1',
      creatingDate: '23.03.06',
    },
    {
      id: '1',
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      nickname: 'chipslover',
      content: '완전 제 스타일~ 짭조름한 양파시즈닝이 너무 맛있네요',
      sumOfStar: '5',
      creatingDate: '23.03.06',
    }, */
  ]);
  let first = true; // 첫페이지인가
  let last = true; // 마지막페이지
  let number = 0; // 현재 페이지
  let totalPages: 0;
  let totalElements: 0;

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSnackReviewsAPI(id).then((data) => {
        console.log('data', data);
        const myReviewList = getMyReview(data);
        const otherReviewList = getOtherReviewList(data);

        if (myReviewList != null && otherReviewList != null) {
          const newList: ReviewType[] = [...[myReviewList], ...otherReviewList];
          // setCommentList(newList);
        }
        console.log('useEffect ', commentList);
      });
    }
  }, [commentList, id]);
  return (
    <div>
      <ul>
        {commentList?.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
}
