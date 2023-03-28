import React, { useEffect, useState } from "react";
import BottomNav from "@/components/Navbar/BottomNav";
import TopNav from "@/components/Navbar/TopNav";
import { WorldcupSnackType } from "@/types/event";

import styles from "@/styles/event_worldcup.module.css";

import { getWorldcupSnackListAPI } from "@/apis/api/event";

export default function WorldcupEvent() {
  const [worldcupSnackList, setWorldcupSnackList] = useState<WorldcupSnackType[]>([]);
  const [displays, setDisplays] = useState<WorldcupSnackType[]>([]);
  const [winners, setWinners] = useState<WorldcupSnackType[]>([]);

  const [total, setTotal] = useState<string>();
  const [round, setRound] = useState<number>();
  const [now, setNow] = useState<number>();
  const [finish, setFinish] = useState<boolean>();

  useEffect(() => {
    getWorldcupSnackListAPI().then((data) => {
      setWorldcupSnackList(data);
      setDisplays([data[0], data[1]]);
    });

    setTotal("8강");
    setRound(4);
    setNow(1);
    setFinish(false);
  }, []);

  const clickHandler = (snack: WorldcupSnackType) => {
    if (worldcupSnackList.length <= 2) {
      if (winners.length === 0) {
        setDisplays([snack]);

        setFinish(true);
      } else {
        let updatedSnack = [...winners, snack];
        setWorldcupSnackList(updatedSnack);
        setDisplays([updatedSnack[0], updatedSnack[1]]);
        setWinners([]);

        setNow(1);
        round && setRound(round / 2);
        if (updatedSnack.length == 4) setTotal("4강");
        else if (updatedSnack.length == 2) setTotal("결승");
      }
    } else if (worldcupSnackList.length > 2) {
      setWinners([...winners, snack]);
      setDisplays([worldcupSnackList[2], worldcupSnackList[3]]);
      setWorldcupSnackList(worldcupSnackList.splice(2));

      now && setNow(now + 1);
    }
  };

  const noFinish = () => {
    return (
      <div>
        <p>{total}</p>
        <p>
          {now}/{round}
        </p>
      </div>
    );
  };

  const yesFinish = () => {
    return (
      <div>
        <p>당신의 선택은? </p>
      </div>
    );
  };

  return (
    <div className="side-margin">
      <TopNav />

      <div>
        <div>
          <div className={styles["title"]}>과자 이상형 월드컵</div>
          {finish ? yesFinish() : noFinish()}
        </div>
        {displays.map((snack) => {
          return (
            <div className={styles["flex-1"]} key={snack.name} onClick={() => clickHandler(snack)}>
              <img className={styles["food-img"]} src={snack.image} alt={snack.name} />
              <div className={styles["name"]}>{snack.name}</div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
