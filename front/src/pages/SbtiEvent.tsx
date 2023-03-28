import React, { useEffect, useState } from "react";
import BottomNav from "@/components/Navbar/BottomNav";
import TopNav from "@/components/Navbar/TopNav";
import { SbtiQuestionType } from "@/types/event";
import { useNavigate } from "react-router";

import styles from "@/styles/event_sbti.module.css";

import { getSbtiQuestionListAPI, getSbtiResultAPI } from "@/apis/api/event";

export default function SbtiEvent() {
  const navigate = useNavigate();
  const navigateTo = (result: string) => {
    navigate(`/event/sbti/${result}`);
  };

  const [sbtiQuestionList, setSbtiQuestionList] = useState<SbtiQuestionType[]>([
    {
      id: "0",
      question: "",
      answer1: "",
      answer2: "",
    },
  ]);
  const [idx, setIdx] = useState<number>();
  const [list, setList] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    getSbtiQuestionListAPI().then((data) => {
      setSbtiQuestionList(data);
    });
    setIdx(0);
  }, []);

  const clickLeft = () => {
    if (idx != undefined) {
      list[idx] = 0;
      if (idx < 3) setIdx(idx + 1);
      else requestResult();
    }
  };

  const clickRight = () => {
    if (idx != undefined) {
      list[idx] = 1;
      if (idx < 3) setIdx(idx + 1);
      else requestResult();
    }
  };

  const requestResult = () => {
    getSbtiResultAPI(list).then((data) => {
      navigate(data);
    });
  };

  return (
    <div className="side-margin">
      <TopNav />

      <div className={styles["question"]}>{idx != undefined && sbtiQuestionList[idx].question}</div>
      <div className={styles["answer"]}>
        <div className={styles["answerItem"]} onClick={clickLeft}>
          {idx != undefined && sbtiQuestionList[idx].answer1}
        </div>
        <div className={styles["answerItem"]} onClick={clickRight}>
          {idx != undefined && sbtiQuestionList[idx].answer2}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
