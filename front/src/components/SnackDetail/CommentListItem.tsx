import React from 'react';
import { ReviewType } from '@/types/snack';
import styles from '@/styles/comment.module.css';
import StarRating from './StarRating';
import useMember from '@/hooks/memberHook';
interface Props {
  isValid: boolean;
  comment: ReviewType;
}
export default function CommentListItem({ isValid, comment }: Props) {
  const { memberData } = useMember();

  return (
    <li className={styles['comment-item']}>
      <div className={styles['member-data']}>
        <img src={comment.writer.image} alt={comment.writer.image} />
        <p>{comment.writer.nickname}</p>
      </div>
      <div className={styles['comment-data']}>
        <StarRating star={comment.star} />
        <p>{comment.createdDate}</p>
      </div>
      {!isValid && memberData.id === comment.writer.writerId && <button className={styles['delete-btn']}>삭제</button>}
      <p>{comment.content}</p>
    </li>
  );
}
