import React, { useCallback, useRef, useState } from 'react';
import styles from '@/styles/comment.module.css';
import CommentList from './CommentList';
export default function Comment() {
  const textRef = useRef<HTMLTextAreaElement>(null);
  let [comment, setComment] = useState('');
  let [isValid, setIsValid] = useState(false);
  const handleResizeHeight = useCallback(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  }, []);
  return (
    <div>
      <div className={styles['comment-write']}>
        {isValid ? (
          <>
            <textarea
              rows={1}
              ref={textRef}
              className={styles.content_text}
              placeholder='댓글 남기기'
              onInput={handleResizeHeight}
            />
            <button>작성</button>
          </>
        ) : (
          <>
            <textarea
              rows={1}
              ref={textRef}
              className={styles.content_text}
              placeholder='이미 등록하셨습니다'
              disabled
            />
            <button disabled>작성</button>
          </>
        )}
      </div>
      <CommentList setIsValid={setIsValid} />
    </div>
  );
}
