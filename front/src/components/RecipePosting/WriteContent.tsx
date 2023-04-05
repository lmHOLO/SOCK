import React from 'react';
import styles from '@/styles/recipe_posting.module.css';
interface Props {
  setContent: React.Dispatch<React.SetStateAction<string>>;
}
export default function WriteContent({ setContent }: Props) {
  return (
    <textarea
      rows={1}
      className={styles['write-content']}
      placeholder=''
      onChange={(e) => setContent(e.target.value)}
    />
  );
}
