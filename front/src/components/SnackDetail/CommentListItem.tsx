import React from 'react';
import { ReviewType } from '@/types/snack';
import styles from '@/styles/comment.module.css';
import StarRating from './StarRating';
interface Props {
  comment: ReviewType;
}
export default function CommentListItem({ comment }: Props) {
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
      <p>{comment.content}</p>
    </li>
  );
}
