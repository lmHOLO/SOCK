import React, { useCallback, useRef, useState } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import styles from '@/styles/profile_modal.module.css';
import { MemberProfileType } from '@/types/member';
interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function FilterModal({ modalOpen, setModalOpen }: Props) {
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleFilterBtnClick = () => {
    setModalOpen(false);
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
          <div className={styles['profile-modal-container']}>
            <div className={styles['content']}></div>
            <button className={styles['modify-button']} onClick={() => handleFilterBtnClick()}>
              적용
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
