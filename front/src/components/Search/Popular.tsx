import styles from '@/styles/search.module.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  popularList: { id: string; snackCheck: boolean; score: number; name: string }[];
}

export default function Popular({ popularList }: Props) {
  const navigate = useNavigate();

  const moveDetail = (item: any) => {
    {
      item.snackCheck ? navigate(`/snacks/${item.id}`) : navigate(`/recipes/${item.id}`);
    }
  };

  return (
    <div className={styles['popular-container']}>
      <ol className={styles['popular-list']}>
        {popularList.map((item, index) => {
          return (
            <li key={index} onClick={() => moveDetail(item)}>
              {index + 1}. {item.name}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
