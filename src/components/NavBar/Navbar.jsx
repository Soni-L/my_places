import React from 'react'
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import  styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Places
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
