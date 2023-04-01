import { SearchMemberType } from '@/types/member';
import React from 'react';
import MemberListItem from './MemberListItem';

interface Props {
  memberList: SearchMemberType[];
}
export default function MemeberList({ memberList }: Props) {
  return (
    <div>
      {memberList.map((member) => (
        <MemberListItem member={member} />
      ))}
    </div>
  );
}
