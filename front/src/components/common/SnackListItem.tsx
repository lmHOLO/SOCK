import React from 'react';
import { SnackListItemType } from '@/types/snack';
import styles from '@/styles/snack_list.module.css';
import { useNavigate } from 'react-router';
interface Props {
  snack: SnackListItemType;
}
export default function RecommendListItem({ snack }: Props) {
  const navigate = useNavigate();
  const snackNavigate = (id: string) => {
    navigate(`/snacks/${id}`);
  };
  return (
    <li className={styles['snack-list-item-container']} onClick={() => snackNavigate(snack.snackId)}>
      <img src={snack.image} alt={snack.title} className={styles['snack-list-item']} />
    </li>
  );
}
