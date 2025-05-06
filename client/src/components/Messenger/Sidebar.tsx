import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import { AppDispatch } from '../../store';
import { getMessages } from "../actions/message_action/getMessages";
import { RootState } from '../../store';
import { getUsers } from '../actions/user_action/getUser';
import { useAuth0 } from '@auth0/auth0-react';
import { debounce } from "lodash";
import axios from "axios";
import { getNotification } from '../actions/notification_action/getNotification';

interface User {
    id: number;
    name: string;
}

interface Notification {
    id?: number;
    senderId: number; 
    unreadCount: number;
    sender?: User;
}

interface SidebarProps {
    setActiveChatId: (id: number) => void;
    unreadCounts: { [userId: number]: number };
}
const Sidebar: React.FC<SidebarProps> = ({ setActiveChatId }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [notification, setNotification] = useState<Notification[]>([]);

    const dispatch = useDispatch<AppDispatch>();

    const usersStatus = useSelector((state: RootState) => state.Users);
    const notificationStatus = useSelector((state: RootState) => state.GetNotification);
    const clearNotificationStatus = useSelector((state: RootState) => state.ClearNotification);

    let drawerWidth = 300;

    const { getAccessTokenSilently } = useAuth0();
    const currentUser = JSON.parse(localStorage.getItem("userInfo") || "{}");

    const searchUsers = debounce(async (query: string) => {
        try{
            const { data } = await axios.get<User[]>("http://localhost:4000/search", {
                params: {query}
            })
            setUsers(data);
        } catch(error){
            console.log(error);
        }
    })
    useEffect(() => {
        const fetchUsers = async () => {
            const token = await getAccessTokenSilently();
            dispatch(getUsers({},token));
        };
        fetchUsers();
    }, [dispatch, getAccessTokenSilently]);

    useEffect(() => {
          searchUsers(searchQuery);
        return () => {
          searchUsers.cancel();
        };
    }, [searchQuery]);

    useEffect(() => {
        dispatch(getNotification({receiverId: currentUser.id}))
    },[]);

    useEffect(() => {
        if(notificationStatus && notificationStatus.status === 'success' && 
            Array.isArray(notificationStatus.data)
        ){
            setNotification(notificationStatus.data as Notification[])
        }
    },[notificationStatus])

    useEffect(() => {
        if(clearNotificationStatus && clearNotificationStatus.status === 'success'){
            setNotification((prev) =>
                prev?.map((n) => ({
                    ...n,
                    unreadCount: 0
                })) || []
            );
        }
    },[clearNotificationStatus])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }

    const unreadMap = notification?.reduce((acc, curr) => {
        acc[curr.senderId] = curr.unreadCount;
        return acc;
    }, {} as Record<number, number>);
      
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
            <Box p={2}>
                <TextField
                    fullWidth
                    label="Search users"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={handleChange}
                />
            </Box>
            <List>
            {users
            ?.filter((user => user.id !== JSON.parse(localStorage.getItem("userInfo") || "{}").id))
            .map((user) => (
                <ListItem component="div" key={user.id} onClick={() => {
                        setActiveChatId(user.id)
                    }}>
                    <ListItemText primary={user.name} />
                    {unreadMap && unreadMap[user.id] > 0 && (
                        <Badge badgeContent={unreadMap[user.id]} color="success" />
                    )}
                </ListItem>
            ))}
            </List>
        </Box>
    </Drawer>

  );
}

export default Sidebar;