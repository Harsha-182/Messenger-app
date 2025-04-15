import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

interface User {
    id: number;
    name: string;
}

interface SidebarProps {
  setReceiverId: (id: number) => void;
}
const Sidebar: React.FC<SidebarProps>= ({ setReceiverId }) => {
  let drawerWidth = 300;
  
  const userList: User[] = [
    { id: 2, name: "John" },
    { id: 3, name: "Alice" },
    { id: 4, name: "Bob" },
    { id: 5, name: "Charlie" },
    { id: 6, name: "David" },
    { id: 7, name: "Eve" },
  ];
  
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
            {userList.map((user) => (
                <ListItem component="div" key={user.id} onClick={() => setReceiverId(user.id)}>
                    <ListItemText primary={user.name} />
                </ListItem>
            ))}
            </List>
        </Box>
    </Drawer>

  );
}

export default Sidebar;