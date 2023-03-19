import React, { useCallback, useRef } from 'react';
import styles from '@/styles/comment.module.css';
import CommentList from './CommentList';
export default function Comment() {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = useCallback(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  }, []);
  return (
    <div>
      <div className={styles['comment-write']}>
        <textarea
          rows={1}
          ref={textRef}
          className={styles.content_text}
          placeholder='댓글 입력하기'
          onInput={handleResizeHeight}
        />
        <button>작성</button>
      </div>
      <CommentList />
    </div>
  );
}
