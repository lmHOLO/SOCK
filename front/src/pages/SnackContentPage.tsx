import React, { useEffect,useState } from 'react';
import SnackGridList from '@/components/common/SnackGridList';
import { SnackDetailType } from '@/types/snack';
import TopNav from '@/components/Navbar/TopNav';
import BottomNav from '@/components/Navbar/BottomNav';
import styles from '@/styles/grid.module.css';
import { useParams } from 'react-router-dom';
import{getSnackListAPI} from '@/apis/api/snackList';

export default function SnackContentPage() {
  const [sort, setSort] = useState<string>('latest');
  const [snackList, setSnackList] = useState<SnackDetailType[]>([]);
  const { theme } = useParams(); // 주제

  const {keyword,flavors,types,arrange} = useParams();
  const undefindValue=[""];
  useEffect(()=>{
    if(!keyword && !flavors && !types){
      getSnackListAPI("",undefindValue,undefindValue,sort).then((data)=>{
        setSnackList(data.content);
      })
    }
  },[keyword,flavors,types,arrange]);

  const handleSort = async (sort: string) => {
    setSort(sort);
    getSnackListAPI("",undefindValue,undefindValue,sort).then((data)=>{
      setSnackList(data.content);
    });
  };
  return (
    <div className='side-margin'>
      <TopNav />
      <div className={styles['theme-container']}>
        {theme === 'retro' && <h1>레트로</h1>}
        {theme === 'movie' && <h1>영화</h1>}
        {theme === 'milk' && <h1>우유</h1>}
        {theme === 'drink' && <h1>술</h1>}
      </div>
      <div className={styles['sort']}>
        {sort === 'popular' && (
          <>
            <button className={styles['bold']}>인기순</button>
            <button onClick={() => handleSort('latest')}>최신순</button>
          </>
        )}
        {sort === 'latest' && (
          <>
            <button onClick={() => handleSort('popular')}>인기순</button>
            <button className={styles['bold']}>최신순</button>
          </>
        )}
      </div>
      <SnackGridList snackList={snackList} />
      <BottomNav />
    </div>
  );
}
