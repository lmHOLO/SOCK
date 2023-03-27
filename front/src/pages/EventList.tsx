import BottomNav from "@/components/Navbar/BottomNav";
import TopNav from "@/components/Navbar/TopNav";


export default function EventList(){

  return (
    <div className='side-margin'>
      <TopNav />

      <div>
        <button>sbti</button>
      </div>
      <div>
        <button>이상형 월드컵</button>
      </div>

      <BottomNav />
    </div>
  );
}