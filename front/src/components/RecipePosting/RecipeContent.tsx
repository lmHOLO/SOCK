import React, { useCallback, useRef } from 'react';
import styles from '@/recipe_posting.module.css';
export default function RecipeContent() {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = useCallback(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  }, []);
  return (
    <div>
      <textarea
        rows={1}
        ref={textRef}
        className={styles.content_text}
        placeholder='댓글 입력하기'
        onInput={handleResizeHeight}
      />
    </div>
  );
}
