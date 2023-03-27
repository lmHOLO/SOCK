import React, { useEffect, useState } from "react";
import BottomNav from "@/components/Navbar/BottomNav";
import TopNav from "@/components/Navbar/TopNav";
import { WorldcupSnackType } from "@/types/event";

import styles from '@/styles/event_worldcup.module.css';

import { getWorldcupSnackListAPI } from "@/apis/api/event";

export default function WorldcupEvent() {
  const [worldcupSnackList, setWorldcupSnackList] = useState<WorldcupSnackType[]>([]);
  const [displays, setDisplays] = useState<WorldcupSnackType[]>([]);
  const [winners, setWinners] = useState<WorldcupSnackType[]>([]);

  useEffect(() => {
    getWorldcupSnackListAPI().then((data) => {
      console.log("data = ", data);
      setWorldcupSnackList(data);
      setDisplays([data[0], data[1]]);
    });
  }, []);

  const clickHandler = (snack : WorldcupSnackType) => {
    if(worldcupSnackList.length <= 2) {
      if(winners.length === 0){
        setDisplays([snack]);
      } 
      else{
        let updatedSnack = [...winners, snack];
        setWorldcupSnackList(updatedSnack);
        setDisplays([updatedSnack[0], updatedSnack[1]]);
        setWinners([]);
      }
    }
    else if(worldcupSnackList.length > 2){
      setWinners([...winners, snack]);
      setDisplays([worldcupSnackList[2], worldcupSnackList[3]]);
      setWorldcupSnackList(worldcupSnackList.splice(2));
    }
  };

  let round: number = 8;
  let total : number = 4;
  let now : number = 1;

  return (
    <div className="side-margin">
      <TopNav />

      <div>
        <div>
          <div className={styles['title']}>과자 이상형 월드컵</div>
          <p>{round}강 </p>
        </div>
        {displays.map(snack => {
          console.log("snack image = " + snack.image);
          return (
            <div className={styles['flex-1']} key={snack.name} onClick={() => clickHandler(snack)}>
              <img className={styles['food-img']} src={snack.image} alt={snack.name} />
              <div className={styles['name']}>{snack.name}</div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
