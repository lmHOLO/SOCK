import React, { useEffect, useState } from "react";
import BottomNav from "@/components/Navbar/BottomNav";
import TopNav from "@/components/Navbar/TopNav";
import { WorldcupSnackType } from "@/types/event";

import { getWorldcupSnackListAPI } from "@/apis/api/event";

export default function WorldcupEvent() {
  useEffect(() => {
    getWorldcupSnackListAPI().then((data) => {
      setWorldcupSnackList(data);
    });
  }, []);

  const [worldcupSnackList, setWorldcupSnackList] = useState<WorldcupSnackType[]>([]);
  let round: number = 16;

  return (
    <div className="side-margin">
      <TopNav />

      <div>HELLO</div>
      <div>
        <div>
          <p>과자 이상형 월드컵</p>
          <p>{round}강 </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
