import React, { useEffect, useState, useRef } from 'react';
import TopNav from '@/components/Navbar/TopNav';
import BottomNav from '@/components/Navbar/BottomNav';
import SnackList from '@/components/common/SnackList';
import useMember from '@/hooks/memberHook';
import styles from '@/styles/home.module.css';
import { SnackListItemType } from '@/types/snack';
import ThemeList from '@/components/Home/ThemeList';
import Recommend from '@/components/Home/Recommend';
import Retro from '@/components/Home/Retro';
import Movie from '@/components/Home/Movie';
import Milk from '@/components/Home/Milk';

export default function Home() {
  // const nickname = useSelector((state: RootState) => state.member.nickname);
  const { memberData } = useMember();
  // TODO: 나중에 api로 추천 snack 받아오기
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(1);
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
  /*  useEffect(() => {
    window.scrollTo(0, 0);
    const wheelHandler = (e: any) => {
      e.preventDefault();
      const { deltaY } = e;
      const scrollTop = outerDivRef.current?.scrollTop; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop && scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log('현재 1페이지, down');
          outerDivRef.current?.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(2);
        } else if (scrollTop && scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log('현재 2페이지, down');
          outerDivRef.current?.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(3);
        } else {
          // 현재 3페이지
          console.log('현재 3페이지, down');
          outerDivRef.current?.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(3);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop && scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log('현재 1페이지, up');
          outerDivRef.current?.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(1);
        } else if (scrollTop && scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log('현재 2페이지, up');
          outerDivRef.current?.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(1);
        } else {
          // 현재 3페이지
          console.log('현재 3페이지, up');
          outerDivRef.current?.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(2);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent && outerDivRefCurrent.addEventListener('wheel', wheelHandler);
    return () => {
      outerDivRefCurrent && outerDivRefCurrent.removeEventListener('wheel', wheelHandler);
    };
  }, []); */

  return (
    <div ref={outerDivRef} className={styles['outer']}>
      <TopNav />
      {/* <Ads /> */}
      <Recommend recommendSnackList={recommendSnackList} />
      {/* <div className='divider'></div> */}
      <Movie recommendSnackList={recommendSnackList} />
      <Retro recommendSnackList={recommendSnackList} />
      <Milk />
      <BottomNav />
    </div>
  );
}
