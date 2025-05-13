import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Box,
	Drawer,
	Toolbar,
	List,
	Badge,
	ListItem,
	ListItemText,
	TextField,
	Typography,
	IconButton,
	useMediaQuery,
	AppBar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { AppDispatch, RootState } from '../../store';
import { getMessages } from "../actions/message_action/getMessages";
import { getUsers } from '../actions/user_action/getUser';
import { useAuth0 } from '@auth0/auth0-react';
import { debounce } from "lodash";
import axios from "axios";
import { getNotification } from '../actions/notification_action/getNotification';

interface User {
	id: number;
	name: string;
	picture: string;
}

interface Notification {
	id?: number;
	senderId: number;
	unreadCount: number;
	sender?: User;
}

interface SidebarProps {
	setActiveChatId: (user: { id: number; name: string; picture: string }) => void;
	unreadCounts: { [userId: number]: number };
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveChatId }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [notification, setNotification] = useState<Notification[]>([]);
	const [mobileOpen, setMobileOpen] = useState(false);

	const dispatch = useDispatch<AppDispatch>();
	const usersStatus = useSelector((state: RootState) => state.Users);
	const notificationStatus = useSelector((state: RootState) => state.GetNotification);
	const clearNotificationStatus = useSelector((state: RootState) => state.ClearNotification);

	const isMobile = useMediaQuery('(max-width:600px)');
	const drawerWidth = 300;

	const { getAccessTokenSilently } = useAuth0();
	const currentUser = JSON.parse(localStorage.getItem("userInfo") || "{}");

	const searchUsers = debounce(async (query: string) => {
		try {
			const { data } = await axios.get<User[]>("http://localhost:4000/search", {
				params: { query },
			});
			setUsers(data);
		} catch (error) {
			console.log(error);
		}
	}, 300);

	useEffect(() => {
		const fetchUsers = async () => {
			const token = await getAccessTokenSilently();
			dispatch(getUsers({}, token));
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
		if (currentUser?.id) {
			dispatch(getNotification({ receiverId: currentUser.id }));
		}
	}, [currentUser?.id]);

	useEffect(() => {
		if (notificationStatus?.status === 'success' && Array.isArray(notificationStatus.data)) {
			setNotification(notificationStatus.data as Notification[]);
		}
	}, [notificationStatus]);

	useEffect(() => {
		if (clearNotificationStatus?.status === 'success') {
			setNotification((prev) =>
				prev.map((n) => ({ ...n, unreadCount: 0 }))
			);
			dispatch(getNotification({ receiverId: currentUser.id }));
		}
	}, [clearNotificationStatus]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	const unreadMap = Array.isArray(notification)
		? notification.reduce((acc, curr) => {
				acc[curr.senderId] = curr.unreadCount;
				return acc;
		  }, {} as Record<number, number>)
		: {};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawerContent = (
		<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					p: 2,
					borderBottom: "1px solid #dbdbdb",
					backgroundColor: "#F0F2F5",
				}}
			>
				<img
					src={currentUser.picture}
					onError={(e) => {
						e.currentTarget.src =
							"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
					}}
					alt="Profile"
					style={{
						width: 40,
						height: 40,
						borderRadius: "50%",
						marginRight: 10,
					}}
				/>
				<Typography
					variant="h6"
					sx={{
						fontWeight: 600,
						fontStyle: "Work Sans",
						fontSize: '20px',
					}}
				>
					{currentUser.name}
				</Typography>
			</Box>

			<Box p={2}>
				<TextField
					fullWidth
					label="Search or start new chat"
					variant="outlined"
					size="small"
					value={searchQuery}
					onChange={handleChange}
					InputProps={{
						endAdornment: <SearchIcon />,
					}}
				/>
			</Box>

			<Box sx={{ flexGrow: 1, overflowY: isMobile ? 'hidden' : 'auto' }}>
				<List>
					{users
						?.filter((user) => user.id !== currentUser.id)
						.map((user) => (
							<ListItem
								key={user.id}
								onClick={() => {
									setActiveChatId({
										id: user.id,
										name: user.name,
										picture: user.picture,
									});
									if (isMobile) setMobileOpen(false);
								}}
								sx={{
									cursor: 'pointer',
									borderBottom: '1px solid #dbdbdb',
									'&:hover': {
										backgroundColor: '#D9FDD3',
									},
								}}
							>
								<ListItemText primary={user.name} />
								{unreadMap[user.id] > 0 && (
									<Badge badgeContent={unreadMap[user.id]} color="success" />
								)}
							</ListItem>
						))}
				</List>
			</Box>
		</Box>
	);

	return (
		<>
			{isMobile && (
				<AppBar
					position="fixed"
					sx={{ background: 'transparent', boxShadow: 'none' }}
				>
					<Toolbar variant="dense">
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerToggle}
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" sx={{ color: '#333' }}>
							Chats
						</Typography>
					</Toolbar>
				</AppBar>
			)}

			<Drawer
				variant={isMobile ? "temporary" : "permanent"}
				open={isMobile ? mobileOpen : true}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
						height: '100vh',
					},
				}}
			>
				{drawerContent}
			</Drawer>
		</>
	);
};

export default Sidebar;
