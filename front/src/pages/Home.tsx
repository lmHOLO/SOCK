import React, { useEffect, useState, useRef } from 'react';
import TopNav from '@/components/Navbar/TopNav';
import BottomNav from '@/components/Navbar/BottomNav';
import useMember from '@/hooks/memberHook';
import styles from '@/styles/home.module.css';
import { SnackListItemType } from '@/types/snack';
import Recommend from '@/components/Home/Recommend';
import Retro from '@/components/Home/Retro';
import Movie from '@/components/Home/Movie';
import Milk from '@/components/Home/Milk';
import Alchol from '@/components/Home/Alchol';
import { recommendIdAPI, snackDetailAPI } from '@/apis/api/main';
import FirstMain from '@/components/Home/FirstMain';

export default function Home() {
  // const nickname = useSelector((state: RootState) => state.member.nickname);
  const { memberData } = useMember();
  const [token, setToken] = useState('');
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [recommendIdList, setRecommendIdList] = useState<number[]>([]);
  const [recommendSnackList, setRecommendSnackList] = useState<SnackListItemType[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (recommendIdList.length === 0) {
      recommendIdAPI(Number(memberData.id), memberData.grade).then((result) => {
        setRecommendIdList(result);
      });
    }
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
        let newdata: SnackListItemType = {
          snackId: result.data.snackId,
          image: result.data.image,
          title: result.data.title,
        };
        newdatas.push(newdata);
        setRecommendSnackList([...recommendSnackList, ...newdatas]);
      });
    }
  };

  return (
    <div ref={outerDivRef} className={styles['outer']}>
      <TopNav />
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
