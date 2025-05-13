import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { Box, Button, TextField, Typography } from "@mui/material";
import { socket } from "../socket";
import { getMessages } from "../actions/message_action/getMessages";
import { saveNotification } from "../actions/notification_action/saveNotification";
import { RootState } from "../../store";
import { clearNotification } from "../actions/notification_action/clearNotification";
import { getNotification } from "../actions/notification_action/getNotification";
import Header from "./Header";
import { set } from "lodash";

interface Message {
	id?: number;
	content: string;
	senderId: number;
	receiverId: number;
	createdAt?: string;
	sender?: {
		id: number;
		name: string;
	};
	receiver?: {
		id: number;
		name: string;
	};
}

interface MainChatProps {
	receiverId: {id: number; name: string, picture: string} | null;
	setUnreadCounts: React.Dispatch<React.SetStateAction<{ [userId: number]: number }>>;
	unreadCounts: { [userId: number]: number };
}

const MainChat: React.FC<MainChatProps> = ({ receiverId, setUnreadCounts, unreadCounts }) => {
	const dispatch = useDispatch<AppDispatch>();
	const containerRef = useRef<HTMLDivElement | null>(null);

	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState<string>("");
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isAtBottom, setIsAtBottom] = useState(true);

	const messageStatus = useSelector((state: RootState) => state.Message);
	const currentUser = JSON.parse(localStorage.getItem("userInfo") || "{}");
	
	const senderId = currentUser?.id;
	const hasMoreRef = useRef(hasMore);

	useEffect(() => {
		const container = containerRef.current;
		const previousScrollHeight = container?.scrollHeight || 0;

		if (senderId && receiverId?.id) {
			dispatch(getMessages({ senderId, receiverId: receiverId?.id, page })).then(() => {
				setTimeout(() => {
					if (container) {
						const newScrollHeight = container.scrollHeight;
						container.scrollTop = newScrollHeight - previousScrollHeight;
					}
				}, 100);
			});
		}
	}, [page, senderId, receiverId?.id]);

	useEffect(() => {
		if (messageStatus && messageStatus?.status === "success") {
			const newMessages: Message[] = messageStatus.data || [];

			if (newMessages.length < 20) {
				setHasMore(false);
			}

			if (page === 1) {
				setMessages(newMessages);
			} else {
				setMessages((prev) => [...prev, ...newMessages]);
			}
		}
	}, [messageStatus]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let timeoutId: ReturnType<typeof setTimeout>;

		const handleScroll = () => {
			if (!container) return;
			const threshold = 100;
			const isNearTop = container.scrollTop <= threshold;

			if (isNearTop && hasMore) {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(() => {
					setPage((prev) => prev + 1);
				}, 200);
			}

			const atBottom =
				container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
			setIsAtBottom(atBottom);
		};

		container.addEventListener("scroll", handleScroll);
		return () => {
			container.removeEventListener("scroll", handleScroll);
			clearTimeout(timeoutId);
		};
	}, [hasMore]);

	useEffect(() => {
		const handleNewMessage = (msg: Message) => {
			const isRelevant =
				(msg.sender?.id === senderId && msg.receiver?.id === receiverId?.id) ||
				(msg.sender?.id === receiverId?.id && msg.receiver?.id === senderId);

			if (isRelevant) {
				setMessages((prev) => [msg, ...prev]);

				if (isAtBottom && containerRef.current) {
					setTimeout(() => {
						containerRef.current!.scrollTop = containerRef.current!.scrollHeight;
					}, 100);
				}
			} else if (msg.receiver?.id === senderId) {
				dispatch(
					saveNotification({
						sender_id: msg.sender?.id,
						receiver_id: msg.receiver?.id,
						isRead: false,
					})
				);
				dispatch(getNotification({ receiverId: currentUser.id }));
				setUnreadCounts((prev) => ({
					...prev,
					[Number(msg.sender?.id)]: (prev[Number(msg.sender?.id)] || 0) + 1,
				}));
			}
		};

		socket.on("newMessage", handleNewMessage);

		return () => {
			socket.off("newMessage", handleNewMessage);
		};
	}, [senderId, receiverId?.id, isAtBottom]);

	useEffect(() => {
		setMessages([]);
		setPage(1);
		setHasMore(true);
	}, [receiverId?.id]);

	useEffect(() => {
		if (receiverId?.id && senderId) {
			dispatch(clearNotification({ otherUser: receiverId?.id, currentUser: senderId }));
			setUnreadCounts((prev) => {
				const updatedCounts = { ...prev };
				delete updatedCounts[receiverId?.id];
				return updatedCounts;
			})
		}
	}, [receiverId?.id]);

	const sendMessage = () => {
		if (!input.trim()) return;

		const message = { content: input, senderId, receiverId: receiverId?.id };
		socket.emit("sendMessage", message);
		setInput("");

		setTimeout(() => {
			if (containerRef.current) {
				containerRef.current.scrollTop = containerRef.current.scrollHeight;
			}
		}, 100);
	};

	return (
		<Box
			style = {{ font : 'Work Sans' }}
			sx={{
				flexGrow: 1,
				display: "flex",
				flexDirection: "column",
				height: "100vh",
			}}
		>
			{receiverId?.id ? (
				<>	
					<Header
						name = {receiverId.name || ""}
						picture = {receiverId.picture || ""}
					/>

					<Box
						ref={containerRef}
						sx={{
							flex: 1,
							minHeight: 0,
							overflow: "auto",
							p: 2,
							overflowY: "auto",
							overflowX: "hidden",
							display: "flex",
							flexDirection: "column",
							gap: 2,
							position: "relative",
							height: "100%",
							width: "100%",
							backgroundImage: 'url("/d325851813073ade6648bfeae65648dea3a0d74d.jpg")',
							backgroundRepeat: "repeat",
							backgroundSize: "auto",
							backgroundPosition: "top left",
							opacity: 0.8,
							backgroundColor: "rgba(245, 169, 4, 0.05)",
							backgroundBlendMode: "overlay",

							"&::-webkit-scrollbar": {
								display: "none",
							},

							// Hide scrollbar for Firefox
							scrollbarWidth: "none",
						}}
					>
						<Box
							sx={{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundImage: 'url("/d325851813073ade6648bfeae65648dea3a0d74d.jpg")',
								backgroundRepeat: "repeat",
								backgroundSize: "auto",
								backgroundPosition: "top left",
								opacity: 0.05, // 5% opacity
								zIndex: 0,
							}}
						/>
						<Box
							sx={{
								position: "relative",
								zIndex: 2,
								display: "flex",
								flexDirection: "column",
								gap: 1.5,
							}}
							>
							{[...messages].reverse().map((msg, index) => {
								const isMe = msg.sender?.id === currentUser.id;

								return (
								<Box
									key={index}
									sx={{
									display: "flex",
									justifyContent: isMe ? "flex-end" : "flex-start",
									}}
								>
									<Box
									sx={{
										px: 2,
										py: 1,
										maxWidth: "75%",
										bgcolor: isMe ? "#D9FDD3" : "#FFFFFF",
										color: "#000",
										borderRadius: "16px",
										borderTopLeftRadius: isMe ? "16px" : 0,
										borderTopRightRadius: isMe ? 0 : "16px",
										boxShadow: 1,
										wordBreak: "break-word",
									}}
									>
									<Typography variant="body2" sx={{ 
										fontSize: "14px",
										fontWeight: 400,
										font: "Work Sans !important",
										color: '#111B21',
										lineHeight: '100%',
										letterSpacing: '-2.5%',
										 }}>
										{msg.content}
									</Typography>
									</Box>
								</Box>
								);
							})}
							</Box>
					</Box>

					<Box
						sx={{
							display: "flex",
							gap: 1,
							p: 2,
							borderTop: "1px solid #dbdbdb",
							backgroundColor: "#F0F2F5",
						}}
					>
						<TextField
							fullWidth
							placeholder="Type a message"
							size="small"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "10px",
									backgroundColor: "#FFFFFF",
								},
							}}
						/>
						<Button
							variant="contained"
							onClick={sendMessage}
							sx={{
								borderRadius: "20px",
								textTransform: "none",
								backgroundColor: "#0095f6",
								"&:hover": { backgroundColor: "#007bb5" },
							}}
						>
							Send
						</Button>
					</Box>
				</>
			) : (
				<Box
					sx={{
						p: 2,
						textAlign: "center",
						flexGrow: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#fafafa",
					}}
				>
					<Typography variant="h6" sx={{ color: "#999" }}>
						Select a user to start chatting
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default MainChat;