import React, { useEffect, useState } from 'react';
import TopNav from '@/components/Navbar/TopNav';
import BottomNav from '@/components/Navbar/BottomNav';
import SnackList from '@/components/common/SnackList';
import useMember from '@/hooks/memberHook';
import styles from '@/styles/home.module.css';
import { SnackListItemType } from '@/types/snack';
import ThemeList from '@/components/Home/ThemeList';
import Recommend from '@/components/Home/Recommend';
import Theme from '@/components/Home/Theme';

export default function Home() {
  // const nickname = useSelector((state: RootState) => state.member.nickname);
  const { memberData } = useMember();

  // TODO: 나중에 api로 추천 snack 받아오기

  const [recommendSnackList, setRecommendSnackList] = useState<SnackListItemType[]>([
    {
      snackId: '1',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '첫번째 과자',
    },
    {
      snackId: '2',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '두번째 과자',
    },
    {
      snackId: '3',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '세번째 과자',
    },
    {
      snackId: '4',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '네번째 과자',
    },
    {
      snackId: '5',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
      title: '다섯번째 과자',
    },
  ]);

  return (
    <div>
      <TopNav />
      {/* <Ads /> */}
      <Recommend recommendSnackList={recommendSnackList} />
      <Theme recommendSnackList={recommendSnackList} />
      <div className={`${styles.title} ${styles.recommend}`}>
        {memberData.nickname && <p>{memberData.nickname}님을 위한 맞춤 추천</p>}
      </div>
      <SnackList snackList={recommendSnackList} />
      <div className='side-margin'>
        <div className={`${styles.title} ${styles.theme}`}>
          <p>테마별 추천</p>
        </div>
        <ThemeList />
      </div>
      <BottomNav />
    </div>
  );
}
