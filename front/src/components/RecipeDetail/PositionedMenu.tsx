import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from '@mui/material';

import { deleteRecipeAPI } from '@/apis/api/recipeDetail';

export default function PositionedMenu() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleModify = () => {
    // console.log('수정');
    setAnchorEl(null);
  };
  const handleDelete = () => {
    // console.log('삭제');
    setAnchorEl(null);
    if (id) {
      deleteRecipeAPI(id).then(() => {
        navigate('/');
      });
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
        <MenuItem onClick={() => handleDelete()}>삭제하기</MenuItem>
      </Menu>
    </div>
  );
}
