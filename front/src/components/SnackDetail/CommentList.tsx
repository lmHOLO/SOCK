import React, { useState } from 'react';
import { CommentType } from '../types';
import CommentListItem from './CommentListItem';

export default function CommentList() {
  const [commentList, setCommentList] = useState<CommentType[]>([
    {
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
    },
  ]);
  return (
    <div>
      <ul>
        {commentList.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
}
