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
import Alchol from '@/components/Home/Alchol';
import { recommendIdAPI, snackDetailAPI } from '@/apis/api/main';
import { setDefaultResultOrder } from 'dns';
import FirstMain from '@/components/Home/FirstMain';

export default function Home() {
  // const nickname = useSelector((state: RootState) => state.member.nickname);
  const { memberData } = useMember();
  // TODO: 나중에 api로 추천 snack 받아오기
  const [token, setToken] = useState('');
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(1);
  const [recommendIdList, setRecommendIdList] = useState<number[]>([]);
  const [recommendSnackList, setRecommendSnackList] = useState<SnackListItemType[]>([

  ]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (recommendIdList.length === 0) {
      console.log(memberData.grade, 'this is grade');
      recommendIdAPI(Number(memberData.id), memberData.grade).then((result) => {
        setRecommendIdList(result);
        console.log(recommendIdList, 'this is myResult');
      });
    }
    // console.log(recommendIdAPI(Number(memberData.id), memberData.grade), typeof(recommendIdAPI(Number(memberData.id), memberData.grade)), 'this is home recommend list')
  }, [recommendIdList]);

  useEffect(() => {
    if (token && recommendIdList.length === 5) {
      getRecommend();
    }
  }, [recommendIdList]);

  const getRecommend = () => {
    const newdatas: SnackListItemType[] = [];
    for (let i = 0; i < 5; i++) {
      snackDetailAPI(recommendIdList[i]).then((result) => {
        let newdata: SnackListItemType = { snackId: result.data.snackId, image: result.data.image, title: result.data.title };
        newdatas.push(newdata);
        // setRecommendSnackList([...recommendSnackList, newdata])
        setRecommendSnackList([...recommendSnackList, ...newdatas]);
      });
    }
  };


  return (
    <div ref={outerDivRef} className={styles['outer']}>
      <TopNav />
      {/* <audio autoPlay>
        <source src={require('@/assets/eating_cracker.mp3')} type='audio/mpeg'></source>
      </audio> */}
      <FirstMain />
      <Recommend recommendSnackList={recommendSnackList} />
      <Movie />
      <Retro />
      <Milk />
      <Alchol />
      <BottomNav />
    </div>
  );
}
