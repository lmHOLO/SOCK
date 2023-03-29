import React from 'react';
import { RecipeCommentType } from '@/types/recipe';
import styles from '@/styles/comment.module.css';
interface Props {
  comment: RecipeCommentType;
}
export default function CommentListItem({ comment }: Props) {
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
      <p>{comment.content}</p>
    </div>
  );
}
