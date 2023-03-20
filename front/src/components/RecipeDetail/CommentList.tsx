import React, { useState } from 'react';
import { RecipeCommentType } from '@/types';
import CommentListItem from './CommentListItem';
// 레시피 댓글
export default function CommentList() {
  const [commentList, setCommentList] = useState<RecipeCommentType[]>([
    {
      commentId: '2',
      memberId: '1',
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      nickname: 'oreooo',
      content: '오레오를 좋아하는 저는 별로 맛있지 않았어요.',
      creatingDate: '23.03.06',
    },
    {
      commentId: '1',
      memberId: '2',
      image: 'https://i.postimg.cc/VL6npV0x/recipe.jpg',
      nickname: 'chipslover',
      content: '완전 제 스타일~ 짭조름한 양파시즈닝이 너무 맛있네요',
      creatingDate: '23.03.06',
    },
  ]);
  return (
    <ul>
      {commentList.map((comment) => (
        <CommentListItem key={comment.commentId} comment={comment} />
      ))}
    </ul>
  );
}
