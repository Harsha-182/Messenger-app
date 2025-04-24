import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar: React.FC = () => {
  const currentUser = JSON.parse(localStorage.getItem("userInfo") || "{}");
  return (
    <AppBar position="static"  style={{backgroundColor: '#00a884'}}>
      <Toolbar>
        <Typography variant="h6">Messenger</Typography>
        <Typography variant="h6" style={{ marginLeft: 'auto' }}>
          {currentUser.name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
