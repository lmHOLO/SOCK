import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from '@mui/material';
import styles from '@/styles/profile.module.css';
interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function PositionedMenu({ setModalOpen }: Props) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleModify = () => {
    setModalOpen(true);
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    navigate('/login');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles['more-btn-container']}>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleModify()}>수정하기</MenuItem>
        <MenuItem onClick={() => handleLogout()}>로그아웃</MenuItem>
      </Menu>
    </div>
  );
}
