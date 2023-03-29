import React from 'react';
import { RecipeCommentType } from '@/types/recipe';
import styles from '@/styles/comment.module.css';
import useMember from '@/hooks/memberHook';
interface Props {
  comment: RecipeCommentType;
}
export default function CommentListItem({ comment }: Props) {
  const { memberData } = useMember();
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
      {memberData.id === comment.memberId && <button className={styles['delete-btn']}>삭제</button>}
      <p>{comment.content}</p>
    </div>
  );
}
