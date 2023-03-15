import React from 'react';
import useMember from '@/hooks/memberHook';

export default function Home() {
  // const nickname = useSelector((state: RootState) => state.member.nickname);
  const { isLoggedIn, memberData } = useMember();
  return (
    <div>
      <div>홈입니다</div>
      <div>닉네임: {memberData.nickname}</div>
    </div>
  );
}
