import BottomNav from "@/components/Navbar/BottomNav";
import TopNav from "@/components/Navbar/TopNav";
import { useNavigate } from "react-router";
import sbti_title2 from "@/assets/event/sbti_title.png";
import worldcup_title from "@/assets/event/worldcup_title.png";
import styles from "@/styles/event_list.module.css";

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

export default function EventList() {
  const navigate = useNavigate();
  const navigateTo = (name: string) => {
    navigate(`/event/${name}`);
  };

  return (
    <div className="side-margin">
      <TopNav />
      <div className={styles["event-list-img"]}>
        <Card sx={{ maxWidth: 300 }}  onClick={() => navigateTo("sbti")}>
          <CardActionArea >
            <CardMedia
              component="img"
              height="300"
              width="300"
              image={sbti_title2}
              alt="SBTI"
            />
          </CardActionArea>
        </Card>
      </div>
        
      <div className={styles["event-list-img"]}>
        <Card sx={{ maxWidth: 300 }}  onClick={() => navigateTo("worldcup")}>
          <CardActionArea >
            <CardMedia
              component="img"
              // height="300"
              // width="300"
              image={worldcup_title}
              alt="SBTI"
            />
          </CardActionArea>
        </Card>
      </div>






      <BottomNav />
    </div>
  );
}
