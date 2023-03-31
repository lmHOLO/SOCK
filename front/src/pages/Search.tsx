import TopNavOnlyBack from '@/components/Navbar/TopNavOnlyBack';
import PositionedMenu from '@/components/Search/PositionedMenu';
import { SearchThemeType } from '@/types/search';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/search.module.css';
import Popular from '@/components/Search/Popular';
import { useNavigate } from 'react-router-dom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { getTopPopularListAPI } from '@/apis/api/search';
import FilterModal from '@/components/Search/FilterModal';

export default function Search() {
  const [theme, setTheme] = useState<SearchThemeType>('snack'); // 찾는 주제
  const [searchBar, setSearchBar] = useState<string>('');
  const [popularList, setPopularList] = useState<{ id: string; snackCheck: boolean; score: number; name: string }[]>(
    [],
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // const { keyword, arrange, memberId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getTopPopularListAPI().then((data) => {
      setPopularList(data);
    });
  }, []);

  const searchEvent = () => {
    if (theme === 'snack') {
      navigate(`/snacks`);
    } else if (theme === 'recipe') {
      navigate(`/recipes`, { state: searchBar });
    } else if (theme === 'member') {
    }
  };

  const handleSearchBar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value);
  };

  return (
    <div className='side-margin'>
      <TopNavOnlyBack />
      <div className={styles['search-bar-conatiner']}>
        <PositionedMenu theme={theme} setTheme={setTheme} />
        <input className={styles['search-bar']} type='text' onChange={(e) => handleSearchBar(e)} />
        <button className={styles['search-btn']} onClick={searchEvent}>
          <p>검색</p>
        </button>
      </div>
      <div className={styles['filter-container']}>
        <FilterAltIcon className={styles['filter-btn']} />
      </div>
      <FilterModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Popular popularList={popularList} />
      <BottomNav />
    </div>
  );
}
