import styles from '@/styles/search.module.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  popularList: { id: string; snackCheck: boolean; score: number; name: string }[];
}

export default function Popular({ popularList }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles['popular-container']}>
      <ol className={styles['popular-list']}>
        {popularList.map((item, index) => {
          return (
            <li key={index} onClick={() => navigate(`/snacks/${item.id}`)}>
              {index + 1}. {item.name}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
