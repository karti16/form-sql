import { IconButton, Typography } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const headerStyle = {
    backgroundColor: '#426cf5',
    color: 'white',
    padding: '20px 10px',
    margin: '0px ',
    marginBottom: '20px',
    display: 'flex',
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
      <Typography variant="h4">Student Form</Typography>
    </div>
  );
};

export default Header;
