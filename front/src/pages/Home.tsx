import React from 'react';
import useMember from '@/hooks/memberHook';
import TopNav from '@/components/Navbar/TopNav';
import BottomNav from '@/components/Navbar/BottomNav';
import Ads from '@/components/Home/Ads';
export default function Home() {
  // const nickname = useSelector((state: RootState) => state.member.nickname);
  const { isLoggedIn, memberData } = useMember();
  return (
    <div>
      <TopNav />
      <Ads />
      <div>홈입니다</div>
      <div>닉네임: {memberData.nickname}</div>

      <BottomNav />
    </div>
  );
}
