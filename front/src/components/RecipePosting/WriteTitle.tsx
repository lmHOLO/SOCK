import React, { useCallback, useRef } from 'react';
import styles from '@/styles/recipe_posting.module.css';
interface Props {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}
export default function WriteTitle({ setTitle}: Props ) {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = useCallback(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  }, []);
  return (
    <textarea
      rows={1}
      ref={textRef}
      className={styles['write-title']}
      placeholder='제목을 입력해주세요'
      minLength={1}
      onInput={handleResizeHeight}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}
