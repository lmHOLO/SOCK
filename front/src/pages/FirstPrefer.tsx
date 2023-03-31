import React, { useEffect, useState } from "react";
import { authApiInstance } from '@/apis/axiosConfig';
import { apiInstance } from '@/apis/axiosConfig'
import { firstPreferApi } from '@/apis/api/firstprefer';
import { SnackPreferType } from '@/types/snack';
import TinderCard from 'react-tinder-card'
import { LinearProgress } from "@mui/material";
import '@react-spring/web';

interface SwipeCounts {
  left: number;
  right: number;
}

export default function FirstPrefer() {
  
  const [swipeCounts, setSwipeCounts] = useState<SwipeCounts>({ left: 0, right: 0 });
  const [likeList, setLikeList] = useState<number[]>([]);
  const [dislikeList, setDislikeList] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0); // new state to keep track of current index
  
  const handleSwipe = (direction: string, snackId: number) => {
    if (direction === 'left') {
      setSwipeCounts({ ...swipeCounts, left: swipeCounts.left + 1 });
      setDislikeList([...dislikeList, snackId])
    } else if (direction === 'right') {
      setSwipeCounts({ ...swipeCounts, right: swipeCounts.right + 1 });
      setLikeList([...likeList, snackId])
    }
    // update current index
    setCurrentIndex(currentIndex + 1);
  };
  
  const [firstPreferList, setFirstPreferList] = useState<SnackPreferType[]>([]);
  // const normalise = (firstPreferList.length) => (firstPreferList.length/5 * 100);
  
  // 초기선호도 리스트가 비어있을 때만 최초로 1회 30개의 무작위 과자 리스트를 가져옴.
  useEffect(() => {
    if (firstPreferList.length === 0){
      // fetch data and update state when component mounts
      firstPreferApi().then((response) => {
        console.log(response, "list of initial preference surveys");
        setFirstPreferList(response);
        console.log(firstPreferList, 'one of preferlist')
      });
    }
    }, [firstPreferList]
  )

  useEffect(() => {
    console.log('this is likeList', likeList)
  }, [likeList])
  useEffect(() => {
    console.log('this is currentImdex', currentIndex)
  }, [currentIndex])

  // map firstPreferList outside of return statement
  // const currentSnack = firstPreferList[currentIndex] || null;
  // const card = currentSnack ? (
  //   <TinderCard onSwipe={(direction) => handleSwipe(direction, currentSnack.snackId)}>
  //     <div className="card">
  //       <div>
  //         {currentSnack.snackId}
  //       </div>
  //     </div>
  //   </TinderCard>
  // ) : null;


  return (<>

  <div>
  <React.Fragment>
      <LinearProgress variant="determinate" value={((likeList.length)*20)} />
    </React.Fragment>
    <h2>Left Swipes: {swipeCounts.left}</h2>
    <h2>Right Swipes: {swipeCounts.right}</h2>

    <div className="cardContainer">
      {firstPreferList.map((snack, index) => {
        if (index === currentIndex) {
          return (
            <TinderCard onSwipe={(direction) => handleSwipe(direction, snack.snackId)} key={snack.snackId}>
              <div className="card">
                <img src={snack.image} alt="" />
                <div>
                  {snack.name}
                </div>

              </div>
            </TinderCard>
          )
        } else {
          return null;
        }
      })}
    </div>
    {likeList.length === 5 && (
        <button onClick={() => console.log("Done button clicked!")}>Done</button>
      )}
  </div>
    {/* <div>
      {firstPreferList[2].snackId}
    </div> */}
        {/* <div>
      <p>Initial preference survey page</p>
      {firstPreferList.length === 0 ? (
        <p>Loading...</p>
        ) : (
          <ul>
          {firstPreferList.map((item) => (
            <li key={item.snackId}>{item.name}</li>
            ))}
        </ul>
      )}
    </div> */}

        </>
  );
};



