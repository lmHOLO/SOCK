import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import styles from '@/styles/filter_modal.module.css';
import { FilterType } from '@/types/snack';
interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  applyFilter: (newFilter: FilterType) => Promise<void>;
  filter: FilterType;
}
export default function FilterModal({ modalOpen, setModalOpen, filter, applyFilter }: Props) {
  const [newFilter, setNewFilter] = useState<FilterType>(filter);
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleTypeBtnClick = (e: React.MouseEvent<HTMLElement>) => {
    const value = (e.target as HTMLButtonElement).value;

    if (newFilter.types.includes(value)) {
      const newTypes = newFilter.types.filter((name) => name !== value);
      setNewFilter((prevState) => {
        return { ...prevState, types: newTypes };
      });
    } else {
      const newTypes = [...newFilter.types, value];
      setNewFilter((prevState) => {
        return { ...prevState, types: newTypes };
      });
    }
    console.log(newFilter);
  };
  const handleFlavorBtnClick = (e: React.MouseEvent<HTMLElement>) => {
    const value = (e.target as HTMLButtonElement).value;

    if (newFilter.flavors.includes(value)) {
      const newFlavors = newFilter.flavors.filter((name) => name !== value);
      setNewFilter((prevState) => {
        return { ...prevState, flavors: newFlavors };
      });
    } else {
      const newFlavors = [...newFilter.flavors, value];
      setNewFilter((prevState) => {
        return { ...prevState, flavors: newFlavors };
      });
    }
  };
  const sliceStr = (str: string): string => {
    return str.slice(0, -2);
  };

  const snackList = [
    {
      id: '1',
      name: '쿠키',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/ad%2Fstick.png?alt=media',
    },
    {
      id: '2',
      name: '막대과자',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fstick.png?alt=media',
    },
    {
      id: '3',
      name: '감자칩',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fpotato.png?alt=media',
    },
    {
      id: '4',
      name: '크래커',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fcracker.png?alt=media',
    },
    {
      id: '5',
      name: '비스킷',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fbiscuit.png?alt=media',
    },
    {
      id: '6',
      name: '뻥튀기/건빵',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fgeonbbang.png?alt=media',
    },
    {
      id: '7',
      name: '샌드',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fsand.png?alt=media',
    },
    {
      id: '8',
      name: '나쵸',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fnacho.png?alt=media',
    },
    {
      id: '9',
      name: '고구마',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fsweet-potato.png?alt=media',
    },
    {
      id: '10',
      name: '팝콘',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fpopcorn.png?alt=media',
    },
    {
      id: '11',
      name: '프레첼',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Ffretchel.png?alt=media',
    },
    {
      id: '12',
      name: '옥수수',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fcorn.png?alt=media',
    },
    {
      id: '13',
      name: '새우/오징어',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fshrimp.png?alt=media',
    },
    {
      id: '14',
      name: '양파/마늘맛',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fonion.png?alt=media',
    },
    {
      id: '15',
      name: '젤리',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fjelly.png?alt=media',
    },
    {
      id: '16',
      name: '초콜릿',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fchoco.png?alt=media',
    },
  ];

  const flavorList = [
    {
      id: '1',
      name: '달콤한맛',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fsweet.png?alt=media',
    },
    {
      id: '2',
      name: '고소한맛',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fgoso.png?alt=media',
    },
    {
      id: '3',
      name: '새콤한맛',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fsour.png?alt=media',
    },
    {
      id: '4',
      name: '짭짤한맛',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fsalty.png?alt=media',
    },
    {
      id: '5',
      name: '매콤한맛',
      image: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/icon%2Fspicy.png?alt=media',
    },
  ];

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <div className={styles['filter-modal-container']}>
            <div className={styles['content']}>
              <div>
                <h1>과자류</h1>
                <div className={styles['filter-btn-container']}>
                  {snackList.map((item, index) => {
                    return (
                      <button
                        key={index}
                        value={item.name}
                        className={
                          newFilter.types.includes(item.name) ? `${styles['active']}` : `${styles['not-active']}`
                        }
                        onClick={handleTypeBtnClick}
                      >
                        {<img src={item.image} alt='tag-icon' className={styles['tag-icon']} />}
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <h1>맛</h1>
                <div className={styles['filter-btn-container']}>
                  {flavorList.map((item) => {
                    return (
                      <button
                        key={item.id}
                        value={item.name}
                        className={
                          newFilter.flavors.includes(item.name) ? `${styles['active']}` : `${styles['not-active']}`
                        }
                        onClick={handleFlavorBtnClick}
                      >
                        {<img src={item.image} alt='tag-icon' className={styles['tag-icon']} />}
                        {sliceStr(item.name)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <button className={styles['apply-button']} onClick={() => applyFilter(newFilter)}>
              적용
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
