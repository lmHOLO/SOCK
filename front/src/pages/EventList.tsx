import BottomNav from "@/components/Navbar/BottomNav";
import TopNav from "@/components/Navbar/TopNav";
import { useNavigate } from "react-router";
import sbti_title from "@/assets/event/sbti_title.png";
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
        <Card sx={{ maxWidth: 350 }}  onClick={() => navigateTo("sbti")}>
          <CardActionArea >
            <CardMedia
              component="img"
              image={sbti_title}
              alt="SBTI"
            />
          </CardActionArea>
        </Card>
      </div>
      
      <div className={styles["event-list-img"]}>
        <Card sx={{ maxWidth: 350 }}  onClick={() => navigateTo("worldcup")}>
          <CardActionArea >
            <CardMedia
              component="img"
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
