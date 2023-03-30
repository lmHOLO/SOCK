import React from 'react';
import styles from '@/styles/profile.module.css';
import { MemberProfileType } from '@/types/member';
interface Props {
  member: MemberProfileType;
}
export default function Header({ member }: Props) {
  return (
    <header className={styles['header-container']}>
      <div className={styles['member-info']}>
        <img src={member.profile.image} alt={member.nickname} />
        <div className={styles['member-detail']}>
          <div className={styles['nickname']}>
            <h1>{member.nickname}</h1>
          </div>
          <p className={styles['email']}>{member.email}</p>
          <p>{member.profile.content}</p>
        </div>
      </div>
    </header>
  );
}
