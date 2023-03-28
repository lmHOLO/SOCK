import React, { useEffect, useState } from 'react';
import { RecipeCommentType } from '@/types/recipe';
import CommentListItem from './CommentListItem';
import { useParams } from 'react-router-dom';
import { getRecipeCommentsAPI } from '@/apis/api/recipeDetail';
// 레시피 댓글
export default function CommentList() {
  const [commentList, setCommentList] = useState<RecipeCommentType[]>([]);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getRecipeCommentsAPI(id).then((data) => {
        console.log(data);
        setCommentList(data.content);
      });
    }
  }, [id]);
  return (
    <ul>
      {commentList.map((comment) => (
        <CommentListItem key={comment.commentId} comment={comment} />
      ))}
    </ul>
  );
}
