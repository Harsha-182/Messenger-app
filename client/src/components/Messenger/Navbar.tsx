import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const Navbar: React.FC = () => {
  const currentUser = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const { logout } = useAuth0();

  return (
    <AppBar position="static" style={{ backgroundColor: '#008069' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h6" style={{ fontWeight: 'bold' }}>
        Messenger app
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" style={{ marginRight: '16px', fontWeight: 'bold' }}>
        {currentUser.name}
        </Typography>
        <Button
        variant="outlined"
        style={{
          color: '#ffffff',
          borderColor: '#ffffff',
          textTransform: 'none',
        }}
        onClick={() =>
          logout({
          logoutParams: {
            returnTo: window.location.origin, // Redirect after logout
          },
          })
        }
        >
        Logout
        </Button>
      </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
