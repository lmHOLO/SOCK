import React from 'react';
import styles from '@/styles/profile.module.css';
import { MemberProfileType } from '@/types/member';
import EditIcon from '@mui/icons-material/Edit';
interface Props {
  member: MemberProfileType;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Header({ member, setModalOpen }: Props) {
  return (
    <header className={styles['header-container']}>
      <div className={styles['member-info']}>
        <div className={styles['member-img']}>
          <img src={member.profile.image} alt={member.nickname} />
        </div>
        <div className={styles['member-detail']}>
          <div className={styles['nickname']}>
            <h1>{member.nickname}</h1>
          </div>
          <p className={styles['email']}>{member.email}</p>
          <p>{member.profile.content}</p>
        </div>
        <EditIcon className={styles['edit']} onClick={() => setModalOpen(true)} />
      </div>
    </header>
  );
}
