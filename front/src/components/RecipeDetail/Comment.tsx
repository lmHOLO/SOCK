import React, { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '@/styles/comment.module.css';
import CommentList from './CommentList';
import { postRecipeCommentAPI } from '@/apis/api/recipeDetail';
export default function Comment() {
  const { id } = useParams();
  const textRef = useRef<HTMLTextAreaElement>(null);
  let [comment, setComment] = useState('');

  const handleResizeHeight = useCallback(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const delSpace = (data: string) => {
    return data.replace(/\s/g, '');
  };

  const handleSubmit = () => {
    let newComment = comment;
    if (delSpace(newComment) === '') {
      alert('댓글을 작성해주세요');
      setComment('');
      return;
    }

    id && postRecipeCommentAPI(id, { content: comment });
    window.history.go(0); // 임시로
    console.log(newComment);
  };
  return (
    <div>
      <div className={styles['comment-write']}>
        <textarea
          rows={1}
          ref={textRef}
          className={styles.content_text}
          placeholder='댓글 입력하기'
          onInput={handleResizeHeight}
          onChange={handleChange}
          value={comment}
        />
        <button onClick={handleSubmit}>작성</button>
      </div>
      <CommentList />
    </div>
  );
}
