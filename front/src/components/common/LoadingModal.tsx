import React from 'react';
import '@/styles/redirect.css';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import styles from '@/styles/loading_modal.module.css';

export default function LoadingModal() {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={true}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={true}>
        <div className={styles['loading-container']}>
          <img
            src={require(`@/assets/home/loading_main.gif`)}
            alt='main-loading-animation'
            className='main-loading-animation'
          />
          <img
            src={require(`@/assets/home/loading_sub.gif`)}
            alt='sub-loading-animation'
            className={styles['sub-loading-animation']}
          />
          <h1 className={styles['loading-text']}>로딩중</h1>
        </div>
      </Fade>
    </Modal>
  );
}
