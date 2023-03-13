import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function Home() {
  const nickname = useSelector((state: RootState) => state.member.nickname);
  return (
    <div>
      <div>홈입니다</div>
      <div>닉네임: {nickname}</div>
    </div>
  );
}
