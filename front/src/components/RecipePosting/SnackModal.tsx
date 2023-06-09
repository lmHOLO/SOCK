import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import styles from '@/styles/snack_modal.module.css';
import { PostSnackTagType } from '@/types/recipe';
import { getSnackKeywordSearch } from '@/apis/api/recipeDetail';
import { getSnackForTag } from '@/apis/services/recipePosting';

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addTag: (snack: PostSnackTagType) => void;
}
export default function SnackModal({ modalOpen, setModalOpen, addTag }: Props) {
  const [searchBar, setSearchBar] = useState<string>('');
  const [snackList, setSnackList] = useState<PostSnackTagType[]>([]);
  const handleClose = () => setModalOpen(false);
  const handleSearchBar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value);

    await getSnackKeywordSearch(e.target.value).then((result) => {
      setSnackList(getSnackForTag(result));
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
            <div className={styles['bar-btn-container']}>
              <input className={styles['search-bar']} type='text' onChange={(e) => handleSearchBar(e)} />
              <img
                src={require(`@/assets/home/btn_close.png`)}
                alt='close-button'
                className={styles['close-btn']}
                onClick={() => handleClose()}
              />
            </div>

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
