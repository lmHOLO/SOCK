import React from 'react';
import SnackListItem from '@/components/common/SnackListItem';
import { SnackListItemType } from '@/types';
import styles from '@/styles/snack_list.module.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
interface Props {
  snackList: SnackListItemType[];
}

export default function RecommendList({ snackList }: Props) {
  return (
    <ul className={styles['snack-list']}>
      {snackList.map((snack) => (
        <SnackListItem key={snack.snackId} snack={snack} />
      ))}
      <AddCircleOutlineIcon className={styles['more-btn']} />
    </ul>
  );
}
