import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Sidebar: React.FC= () => {
  let drawerWidth = 300;
  
  return (
    <Drawer
        variant="permanent"
        sx={{
        position: 'relative',
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'relative',
        },
        }}
        open
    >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <List>
            {['Alice', 'Bob', 'Charlie'].map((text) => (
                <ListItem component="div" key={text}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
        </Box>
    </Drawer>

  );
}

export default Sidebar;