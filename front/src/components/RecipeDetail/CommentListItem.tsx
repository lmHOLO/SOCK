import React from 'react';
import { RecipeCommentType } from '@/types/recipe';
import styles from '@/styles/comment.module.css';
import useMember from '@/hooks/memberHook';

import { deleteRecipeCommentAPI, getRecipeCommentsAPI } from '@/apis/api/recipeDetail';

interface Props {
  comment: RecipeCommentType;
  recipeId: string;
  commentList: RecipeCommentType[];
  setCommentList: React.Dispatch<React.SetStateAction<RecipeCommentType[]>>;
}
export default function CommentListItem({ comment, recipeId, commentList, setCommentList }: Props) {
  const { memberData } = useMember();

  const commentDeleteEvent = () => {
    if (comment) {
      deleteRecipeCommentAPI(recipeId, comment.commentId).then(() => {
        getRecipeCommentsAPI(recipeId).then((data) => {
          setCommentList(data.content);
        });
      });
    }
  };

  return (
    <div className={styles['comment-container']}>
      <div className={styles['member-date']}>
        <div className={styles['member-data']}>
          <img src={comment.memberImage} alt={comment.nickname} />
          <p>{comment.nickname}</p>
        </div>
        <div className={styles['comment-data']}>
          <p>{comment.createdDate}</p>
        </div>
      </div>
      {memberData.id === comment.memberId && (
        <button className={styles['delete-btn']} onClick={commentDeleteEvent}>
          삭제
        </button>
      )}
      <pre className={styles['comment-content']}>{comment.content}</pre>
    </div>
  );
}
