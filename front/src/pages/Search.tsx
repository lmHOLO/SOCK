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
import BottomNav from '@/components/Navbar/BottomNav';
import { FilterType } from '@/types/snack';
import SnackGridList from '@/components/common/SnackGridList';
import RecipeGridList from '@/components/common/RecipeGridList';
import { SnackDetailType } from '@/types/snack';
import { GridRecipeListItemType } from '@/types/recipe';
import { getRecipeListAPI } from '@/apis/api/recipeList';
import { getSnackListAPI } from '@/apis/api/snackList';
import { SearchMemberType } from '@/types/member';
import MemeberList from '@/components/common/MemeberList';
import { getMemberListAPI } from '@/apis/api/member';

export default function Search() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<SearchThemeType>('snack'); // 찾는 주제
  const [searchBar, setSearchBar] = useState<string>('');
  const [popularList, setPopularList] = useState<{ id: string; snackCheck: boolean; score: number; name: string }[]>(
    [],
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterType>({
    flavors: [],
    types: [],
  });

  const [sort, setSort] = useState<string>('latest');
  const [snackList, setSnackList] = useState<SnackDetailType[]>([]);
  const [recipeList, setRecipeList] = useState<GridRecipeListItemType[]>([]);
  const [memberList, setMemberList] = useState<SearchMemberType[]>([
    {
      id: '1',
      nickname: '민우',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
    },
    {
      id: '2',
      nickname: '민우',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
    },
  ]);
  const applyFilter = async (newFilter: FilterType) => {
    setFilter(newFilter);
    setModalOpen(false);
  };
  useEffect(() => {
    getTopPopularListAPI().then((data) => {
      setPopularList(data);
    });
  }, []);

  const handleSort = async (sort: string) => {
    setSort(sort);
    if (theme === 'recipe') {
      getRecipeListAPI(searchBar, sort, '').then((data) => {
        setRecipeList(data.content);
      });
      // return;
    }
    if (theme === 'snack') {
      getSnackListAPI(searchBar, filter.flavors, filter.types, sort).then((data) => {
        setSnackList(data.content);
      });
      return;
    }
  };

  const handleSetTheme = (menu: string) => {
    switch (menu) {
      case 'snack':
        setTheme('snack');
        break;
      case 'recipe':
        setTheme('recipe');
        break;
      case 'member':
        setTheme('member');
    }
    setSearchClicked(false);
    setFilter({
      flavors: [],
      types: [],
    });
  };

  const handleSearchBtnClick = () => {
    if (theme === 'snack') {
      getSnackListAPI(searchBar, filter.flavors, filter.types, sort).then((data) => {
        setSnackList(data.content);
      });
      setSearchClicked(true);
    } else if (theme === 'recipe') {
      getRecipeListAPI(searchBar, sort, '').then((data) => {
        setRecipeList(data.content);
      });
      setSearchClicked(true);
    } else if (theme === 'member') {
      getMemberListAPI(searchBar).then((data) => {
        setMemberList(data.content);
      });
      setSearchClicked(true);
    }
  };

  const handleSearchBar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value);
  };

  return (
    <div className='side-margin'>
      <TopNavOnlyBack />
      <div className={styles['search-bar-conatiner']}>
        <PositionedMenu theme={theme} setTheme={setTheme} handleSetTheme={handleSetTheme} />
        <input className={styles['search-bar']} type='text' onChange={(e) => handleSearchBar(e)} />
        <button className={styles['search-btn']} onClick={handleSearchBtnClick}>
          <p>검색</p>
        </button>
      </div>
      <div className={styles['filter-bar']}>
        {searchClicked && (
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
        )}
        <div className={styles['filter-container']} onClick={() => setModalOpen(true)}>
          {theme === 'snack' && <FilterAltIcon className={styles['filter-btn']} />}
        </div>
      </div>
      <div>
        {filter.flavors.map((item, index) => {
          return (
            <span key={index} className={`${styles['selected']}`}>
              {item}
            </span>
          );
        })}
        {filter.types.map((item, index) => {
          return (
            <span key={index} className={`${styles['selected']}`}>
              {item}
            </span>
          );
        })}
      </div>
      <FilterModal modalOpen={modalOpen} setModalOpen={setModalOpen} filter={filter} applyFilter={applyFilter} />
      {!searchClicked && <Popular popularList={popularList} />}
      {searchClicked &&
        theme === 'snack' &&
        (snackList.length ? <SnackGridList snackList={snackList} /> : <p>과자가 없습니다ㅠ</p>)}
      {searchClicked &&
        theme === 'recipe' &&
        (recipeList.length ? <RecipeGridList recipeList={recipeList} /> : <p>레시피가 없습니다ㅠ</p>)}
      {searchClicked &&
        theme === 'member' &&
        (memberList.length ? <MemeberList memberList={memberList} /> : <p>사용자가 없습니다ㅠ</p>)}
      <BottomNav />
    </div>
  );
}
