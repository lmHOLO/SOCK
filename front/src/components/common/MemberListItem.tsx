import { SearchMemberType } from '@/types/member';
import React from 'react';
import styles from '@/styles/member_list.module.css';
import { useNavigate } from 'react-router-dom';
interface Props {
  member: SearchMemberType;
}
export default function MemberListItem({ member }: Props) {
  const navigate = useNavigate();
  return (
    <div className={styles['member']} onClick={() => navigate(`/profile/${member.id}`)}>
      <img src={member.image} alt={member.nickname} />
      <span>{member.nickname}</span>
    </div>
  );
}
