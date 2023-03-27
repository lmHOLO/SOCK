import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import SearchSnack from './SearchSnack';
import styles from '@/styles/snack_modal.module.css';
import { SnackTagType } from '@/types/recipe';
import { getSnackKeywordSearch } from '@/apis/api/recipeDetail';
import { getSnackForTag } from '@/apis/services/recipePosting';

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addTag: (snack: SnackTagType) => void;
}
export default function SnackModal({ modalOpen, setModalOpen, addTag }: Props) {
  const [searchBar, setSearchBar] = useState<string>('');
  const [snackList, setSnackList] = useState<SnackTagType[]>([]);
  const handleClose = () => setModalOpen(false);
  const handleSearchBar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value);
    /* await getSnackKeywordSearch(searchBar).then((result) => {
      console.log(result);
      setSnackList(result);
    }); */
    await getSnackKeywordSearch(searchBar).then((result) => {
      setSnackList(getSnackForTag(result));
    });
  };

  /*   const handleTagAdd = async (snack: TagSearchType) => {
    addTag(snack.snackId);
  }; */

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
            <input className={styles['search-bar']} type='text' onChange={(e) => handleSearchBar(e)} />
            <div className={styles['tag-list']}>
              {snackList.map((snack, index) => {
                return (
                  <div key={index} className={styles['tag-container']} onClick={() => addTag(snack)}>
                    <img src={snack.image} alt={snack.name} />
                    <span>{snack.name}</span>
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
