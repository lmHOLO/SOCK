import React from 'react';
import { CommentType } from '../types';
import styles from '@/styles/comment.module.css';
import StarRating from './StarRating';
interface Props {
  comment: CommentType;
}
export default function CommentListItem({ comment }: Props) {
  return (
    <div>
      <div className={styles['member-data']}>
        <img src={comment.image} alt={comment.nickname} />
        <p>{comment.nickname}</p>
      </div>
      <div className={styles['comment-data']}>
        <div>{comment.sumOfStar}</div>
        <StarRating />
        <p>{comment.creatingDate}</p>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}
