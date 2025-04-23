import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { AppDispatch } from '../../store';
import { getMessages } from "../actions/message_action/getMessages";
import { RootState } from '../../store';
import { getUsers } from '../actions/user_action/getUser';
import { useAuth0 } from '@auth0/auth0-react';

interface User {
    id: number;
    name: string;
}

interface SidebarProps {
  setReceiverId: (id: number) => void;
}
const Sidebar: React.FC<SidebarProps> = ({ setReceiverId }) => {
    const [users, setUsers] = useState<User[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    const usersStatus = useSelector((state: RootState) => state.Users);
    let drawerWidth = 300;

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = await getAccessTokenSilently();
            dispatch(getUsers({},token));
        };
        fetchUsers();
    }, [dispatch, getAccessTokenSilently]);

    useEffect(() => {
        if (usersStatus && usersStatus.data) {
            setUsers(usersStatus.data);
        }
    },[usersStatus])
    
    const handleClick = (num: number) => {
        setReceiverId(num);
        dispatch(getMessages({receiverId : num}));
    }
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
            {users?.map((user) => (
                <ListItem component="div" key={user.id} onClick={() => handleClick(user.id)}>
                    <ListItemText primary={user.name} />
                </ListItem>
            ))}
            </List>
        </Box>
    </Drawer>

  );
}

export default Sidebar;