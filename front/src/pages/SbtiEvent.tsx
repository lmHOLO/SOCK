import React, { useEffect, useState } from "react";
import BottomNav from "@/components/Navbar/BottomNav";
import TopNav from "@/components/Navbar/TopNav";
import { SbtiQuestionType } from "@/types/event";

import styles from "@/styles/event_sbti.module.css";

import { getSbtiQuestionListAPI } from "@/apis/api/event";

export default function SbtiEvent() {
  const [sbtiQuestionList, setSbtiQuestionList] = useState<SbtiQuestionType[]>([
    {
      id: "0",
      question: "",
      answer1: "",
      answer2: "",
    },
  ]);
  const [idx, setIdx] = useState<number>();

  useEffect(() => {
    getSbtiQuestionListAPI().then((data) => {
      console.log("data = ", data);
      setSbtiQuestionList(data);
    });
    setIdx(0);
  }, []);

  return (
    <div className="side-margin">
      <TopNav />

      <div className={styles["question"]}>{idx != undefined && sbtiQuestionList[idx].question}</div>
      <div className={styles["answer"]}>
        <div className={styles["answerItem"]}>{idx != undefined && sbtiQuestionList[idx].answer1}</div>
        <div className={styles["answerItem"]}>{idx != undefined && sbtiQuestionList[idx].answer2}</div>
      </div>
      <BottomNav />
    </div>
  );
}
