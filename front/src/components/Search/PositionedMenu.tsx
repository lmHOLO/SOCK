import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SearchThemeType } from '@/types/search';
import styles from '@/styles/search.module.css';
interface Props {
  theme: SearchThemeType;
  setTheme: React.Dispatch<React.SetStateAction<SearchThemeType>>;
  handleSetTheme: (menu: string) => void;
}
export default function PositionedMenu({ theme, setTheme, handleSetTheme }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (menu: string) => {
    setAnchorEl(null);
    switch (menu) {
      case 'snack':
        handleSetTheme('snack');
        break;
      case 'recipe':
        handleSetTheme('recipe');
        break;
      case 'member':
        handleSetTheme('member');
    }
  };

  return (
    <div>
      <Button
        id='demo-positioned-button'
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={styles['theme-select-btn']}
      >
        {theme === 'snack' && '과자'}
        {theme === 'recipe' && '레시피'}
        {theme === 'member' && '계정'}
      </Button>
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
        <MenuItem onClick={() => handleClose('snack')}>과자</MenuItem>
        <MenuItem onClick={() => handleClose('recipe')}>레시피</MenuItem>
        <MenuItem onClick={() => handleClose('member')}>계정</MenuItem>
      </Menu>
    </div>
  );
}
