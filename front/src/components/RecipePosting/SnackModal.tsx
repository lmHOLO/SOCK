import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import SearchSnack from './SearchSnack';
import styles from '@/styles/snack_modal.module.css';
import { TagSearchType } from '@/types/recipe';
import { getSnackKeywordSearch } from '@/apis/api/recipeDetail';
interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SnackModal({ modalOpen, setModalOpen }: Props) {
  const [searchBar, setSearchBar] = useState<string>('');
  const [snackList, setSnackList] = useState<TagSearchType[]>([]);
  const handleClose = () => setModalOpen(false);
  const handleSearchBar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value);
    getSnackKeywordSearch(searchBar).then((result) => {
      console.log(result);
      setSnackList(result);
    });
  };

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
          <div className={styles['snack-modal-container']}>
            <input type='text' onChange={(e) => handleSearchBar(e)} />
            <div className={styles['tag-list']}>
              {snackList.map((snack, index) => {
                return (
                  <div key={index} className={styles['tag-container']}>
                    <img src={snack.image} alt={snack.name} />
                    <p>{snack.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
