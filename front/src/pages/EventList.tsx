import BottomNav from "@/components/Navbar/BottomNav";
import TopNav from "@/components/Navbar/TopNav";
import { useNavigate } from 'react-router';

export default function EventList(){
  const navigate = useNavigate();
  const navigateTo = (name: string) => {
    navigate(`/event/${name}`);
  };

  return (
    <div className='side-margin'>
      <TopNav />

      <div>
        <button>sbti</button>
      </div>
      <div>
        <button onClick={() => navigateTo('worldcup')}>이상형 월드컵</button>
      </div>

      <BottomNav />
    </div>
  );
}