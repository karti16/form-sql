import { IconButton, Typography } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const headerStyle = {
    backgroundColor: '#426cf5',
    color: 'white',
    padding: '5px 20px',
    margin: '0px ',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  };

  return (
    <div style={headerStyle}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        onClick={() => {
          setIsDrawerOpen(true);
        }}
      >
        <MenuIcon />
      </IconButton>

      <Typography variant="h5">Student Form</Typography>
    </div>
  );
};

export default Header;
