import React, { useEffect, useState } from 'react';
import CommentListItem from './CommentListItem';
import { useParams } from 'react-router-dom';
import { getRecipeCommentsAPI } from '@/apis/api/recipeDetail';
import { RecipeCommentType } from '@/types/recipe';

interface Props {
  recipeId: string;
  commentList: RecipeCommentType[];
  setCommentList: React.Dispatch<React.SetStateAction<RecipeCommentType[]>>;
}

// 레시피 댓글
export default function CommentList({ recipeId, commentList, setCommentList }: Props) {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getRecipeCommentsAPI(id).then((data) => {
        setCommentList(data.content);
      });
    }
  }, [id]);
  return (
    <ul>
      {commentList.map((comment) => (
        <CommentListItem key={comment.commentId} comment={comment} recipeId={recipeId} commentList={commentList} setCommentList={setCommentList} />
      ))}
    </ul>
  );
}
