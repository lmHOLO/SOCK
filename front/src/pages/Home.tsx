import React, { useState } from 'react';
import TopNav from '@/components/Navbar/TopNav';
import BottomNav from '@/components/Navbar/BottomNav';
import Ads from '@/components/Home/Ads';
import SnackList from '@/components/common/SnackList';
import useMember from '@/hooks/memberHook';
import styles from '@/styles/home.module.css';
import { SnackListItemType } from '@/components/types';
import ThemeList from '@/components/Home/ThemeList';
export default function Home() {
  // const nickname = useSelector((state: RootState) => state.member.nickname);
  const { memberData } = useMember();
  // TODO: 나중에 api로 추천 snack 받아오기
  const [recommendSnackList, setRecommendSnackList] = useState<SnackListItemType[]>([
    {
      id: 1,
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '첫번째 과자',
    },
    {
      id: 2,
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '두번째 과자',
    },
    {
      id: 3,
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '첫번째 과자',
    },
    {
      id: 4,
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '두번째 과자',
    },
    {
      id: 5,
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '첫번째 과자',
    },
  ]);

  return (
    <div>
      <TopNav />
      <Ads />
      <div style={{ margin: '10px 0px' }}>
        <div className={`${styles.title} ${styles.recommend}`}>
          <p>{memberData.nickname}님을 위한 맞춤 추천</p>
        </div>
        <SnackList snackList={recommendSnackList} />
      </div>
      <div>
        <div className={`${styles.title} ${styles.theme}`}>
          <p>테마별 추천</p>
        </div>
        <ThemeList />
      </div>
      <BottomNav />
    </div>
  );
}
