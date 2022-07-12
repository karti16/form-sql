import {
  Drawer,
  Box,
  IconButton,
  ListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import AddBox from '@mui/icons-material/AddBox';
import Assignment from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

const Sidebar = ({ isDrawerOpen, setIsDrawerOpen }) => {
  return (
    <>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
      >
        <Box textAlign="right">
          <IconButton
            onClick={() => {
              setIsDrawerOpen(false);
            }}
            size="large"
            edge="start"
            color="inherit"
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />

        <Box p={2} width="250px" textAlign="center" role="presentation">
          <List>
            <ListItem
              key={'Submit New Data'}
              disablePadding
              button
              component={Link}
              to="/"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AddBox />
                </ListItemIcon>

                <ListItemText primary={'Submit New Data'} />
              </ListItemButton>
            </ListItem>
            <ListItem
              key={'View all Data'}
              disablePadding
              button
              component={Link}
              to="/list"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary={'View all Data'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
