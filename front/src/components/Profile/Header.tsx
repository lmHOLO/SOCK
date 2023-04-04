import React from 'react';
import styles from '@/styles/profile.module.css';
import { MemberProfileType } from '@/types/member';
import { getGradeImage, getSbtiImage } from '@/utils/memberInfo';
interface Props {
  member: MemberProfileType;
}
export default function Header({ member }: Props) {
  const gradeImage = getGradeImage(member.grade);
  const sbtiImage = getSbtiImage(member.sbti);
  return (
    <header className={styles['header-container']}>
      <div className={styles['member-info']}>
        <div className={styles['member-img']}>
          <img src={member.profile.image} alt={member.nickname} />
        </div>
        <div className={styles['member-detail']}>
          <div className={styles['nickname']}>
            <h1>{member.nickname}</h1>
            <div className={styles['grade-sbti']}>
              {gradeImage && <img src={`${gradeImage}`} alt={member.grade} />}
              {sbtiImage && <img src={`${sbtiImage}`} alt={member.sbti} />}
            </div>
          </div>
          <p className={styles['email']}>{member.email}</p>
          <p>{member.profile.content}</p>
        </div>
      </div>
    </header>
  );
}
