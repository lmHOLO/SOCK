import BottomNav from '@/components/Navbar/BottomNav';
import TopNav from '@/components/Navbar/TopNav';
import { useParams } from 'react-router-dom';

export default function EventResult() {
  const { result } = useParams();

  return (
    <div className='side-margin'>
      <TopNav />
      <div>
        <img className='resultImage' src={require(`@/assets/sbti/result/${result}.png`)} alt={result} />
      </div>
      <BottomNav />
    </div>
  );
}
