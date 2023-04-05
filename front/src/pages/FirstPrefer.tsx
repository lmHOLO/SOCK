import React, { useEffect, useState } from 'react';
import useMember from '@/hooks/memberHook';
import { useNavigate } from 'react-router-dom';
import { firstPreferApi, CbfApi, checkPreferenceAPI } from '@/apis/api/firstprefer';
import { SnackPreferType } from '@/types/snack';
import TinderCard from 'react-tinder-card';
import { LinearProgress } from '@mui/material';
import { checkPreferType } from '@/types/snack';
import styles from '@/styles/firstprefer.module.css';
import '@react-spring/web';
interface SwipeCounts {
  left: number;
  right: number;
}

export default function FirstPrefer() {
  const [token, setToken] = useState('');
  const { memberData } = useMember();
  const navigate = useNavigate();
  const [myPreference, setMyPreference] = useState<checkPreferType[]>([]);
  const [swipeCounts, setSwipeCounts] = useState<SwipeCounts>({ left: 0, right: 0 });
  const [likeList, setLikeList] = useState<number[]>([]);
  const [dislikeList, setDislikeList] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0); // new state to keep track of current index

  const handleSwipe = (direction: string, snackId: number) => {
    if (direction === 'left') {
      setSwipeCounts({ ...swipeCounts, left: swipeCounts.left + 1 });
      setDislikeList([...dislikeList, snackId]);
    } else if (direction === 'right') {
      setSwipeCounts({ ...swipeCounts, right: swipeCounts.right + 1 });
      setLikeList([...likeList, snackId]);
    }
    // update current index
    setCurrentIndex(currentIndex + 1);
  };

  const [firstPreferList, setFirstPreferList] = useState<SnackPreferType[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // 초기선호도 리스트가 비어있을 때만 최초로 1회 30개의 무작위 과자 리스트를 가져옴.
  useEffect(() => {
    if (firstPreferList.length === 0) {
      // fetch data and update state when component mounts
      firstPreferApi().then((response) => {
        setFirstPreferList(response);
      });
    }
  }, [firstPreferList]);

  useEffect(() => {
    if (likeList.length === 5) {
      likeList.forEach((snackId) => {
        const newPreference: checkPreferType = {
          snackId: snackId,
          likes: 1,
        };
        setMyPreference((prevPreferences) => [...prevPreferences, newPreference]);
      });
      // fetch data and update state when component mounts
      CbfApi({ id: Number(memberData.id), favor_list: likeList })
        .then((response) => {
          // console.log(response, '컨텐츠기반 선호도조사의 결과');
        })
        .then(() => checkPreferenceAPI(myPreference).then(() => navigate('/')));
    }
  }, [likeList]);
  return (
    <>
      <div className={styles['prefer-page']}>
        <React.Fragment>
          <LinearProgress variant='determinate' value={likeList.length * 20} />
        </React.Fragment>
        <div className={styles['prefer-container']}>
          <div className={styles['prefer-count']}>{likeList.length}/5</div>
          <div className={styles['left-arrow-container']}>
            <img src={require(`@/assets/login/dislike.png`)} alt='left arrow' />
            <img src={require(`@/assets/login/left_arrow.png`)} alt='left arrow' />
          </div>

          {firstPreferList.map((snack, index) => {
            if (index === currentIndex) {
              return (
                <TinderCard onSwipe={(direction) => handleSwipe(direction, snack.snackId)} key={snack.snackId}>
                  <div className={styles['prefer-card']}>
                    <img src={snack.image} alt={snack.name} />
                    <p>{snack.name}</p>
                  </div>
                </TinderCard>
              );
            } else {
              return null;
            }
          })}
          <div className={styles['right-arrow-container']}>
            <img src={require(`@/assets/login/like.png`)} alt='left arrow' />
            <img src={require(`@/assets/login/right_arrow.png`)} alt='left arrow' />
          </div>
        </div>
      </div>
    </>
  );
}
