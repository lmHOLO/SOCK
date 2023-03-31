import React, { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '@/styles/comment.module.css';
import CommentList from './CommentList';
import CommentRating from './CommentRating';
import { postSnackReviewAPI } from '@/apis/api/snackDetail';

export default function Comment() {
  const { id } = useParams();
  const textRef = useRef<HTMLTextAreaElement>(null);
  let [comment, setComment] = useState('');
  let [isValid, setIsValid] = useState(false);
  let [starPoint, setStarPoint] = useState(-1);
  const handleResizeHeight = useCallback(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  }, []);
  const delSpace = (data: string) => {
    return data.replace(/\s/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    let newComment = comment;
    let newStarPoint = starPoint + 1;
    if (delSpace(newComment) === '') {
      alert('댓글을 작성해주세요');
      setComment('');
      return;
    }
    if (starPoint < 0) {
      alert('별점을 등록해주세요');
      return;
    }
    // 리뷰 등록하기
    if (id && newStarPoint > 0) {
      postSnackReviewAPI(id, { content: comment, star: newStarPoint });
      window.history.go(0); // 임시로
    }

    console.log(newComment);
  };
  return (
    <div>
      {isValid && <CommentRating setStarPoint={setStarPoint} />}
      <div className={styles['comment-write']}>
        {isValid ? (
          <>
            <textarea
              rows={1}
              ref={textRef}
              className={styles.content_text}
              placeholder='댓글 남기기'
              onInput={handleResizeHeight}
              onChange={handleChange}
              value={comment}
            />
            <button onClick={handleSubmit}>작성</button>
          </>
        ) : (
          <>
            <textarea rows={1} ref={textRef} className={styles.content_text} placeholder='이미 등록하셨습니다' disabled />
            <button disabled>작성</button>
          </>
        )}
      </div>
      {id && <CommentList isValid={isValid} setIsValid={setIsValid} snackId={id} />}
    </div>
  );
}
