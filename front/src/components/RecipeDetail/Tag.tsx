import React from 'react';
import styles from '@/styles/recipe_detail.module.css';
import { GetSnackTagType } from '@/types/recipe';
import { useNavigate } from 'react-router';

interface Props {
  tag: GetSnackTagType;
}
export default function Tag({ tag }: Props) {
  const navigate = useNavigate();
  const navigateTo = (id: string) => {
    navigate(`/snacks/${id}`);
  };

  const clickTagEvent = () => {
    navigateTo(tag.snackId);
  };

  return (
    <div className={styles['tag-container']} onClick={clickTagEvent}>
      <img src={tag.image} alt={tag.snackName} />
      <p>{tag.snackName}</p>
    </div>
  );
}
