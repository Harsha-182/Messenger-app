import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { Box, Button, TextField, Typography } from "@mui/material";
import { socket } from "../socket";
import { getMessages } from "../actions/message_action/getMessages";
import { RootState } from '../../store';

interface Message {
  id?: number;
  content: string;
  senderId: number;
  receiverId: number;
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
  receiverId: number | null;
  setUnreadCounts: React.Dispatch<React.SetStateAction<{ [userId: number]: number }>>;
}

const MainChat: React.FC<MainChatProps> = ({ receiverId, setUnreadCounts }) => {
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

  useEffect(() => {
    const container = containerRef.current;
  const previousScrollHeight = container?.scrollHeight || 0;

  if (senderId && receiverId) {
    dispatch(getMessages({ senderId, receiverId, page })).then(() => {
      setTimeout(() => {
        if (container) {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop = newScrollHeight - previousScrollHeight;
        }
      }, 100);
    });
  }
  }, [page, senderId, receiverId]);

  // Handle fetched messages
  useEffect(() => {
    const newMessages: Message[] = messageStatus.data || [];

    if (newMessages.length < 20) {
      setHasMore(false);
    }

    if (newMessages.length > 0) {
      setMessages((prev) => [...prev, ...newMessages]);
    }
  }, [messageStatus]);

  // Handle scroll to top pagination
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (!container) return;

      if (container.scrollTop === 0 && hasMore) {
        setPage((prev) => prev + 1);
      }

      const atBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
      setIsAtBottom(atBottom);
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  // Listen for new messages
  useEffect(() => {
    const handleNewMessage = (msg: Message) => {
      const isRelevant =
        (msg.sender?.id === senderId && msg.receiver?.id === receiverId) ||
        (msg.sender?.id === receiverId && msg.receiver?.id === senderId);

      if (isRelevant) {
        // console.log("New message received:---------------------", message);
        setMessages((prev) => [msg, ...prev]);

        if (isAtBottom && containerRef.current) {
          setTimeout(() => {
            containerRef.current!.scrollTop = containerRef.current!.scrollHeight;
          }, 100);
        }
      } else if (msg.receiver?.id === senderId) {
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
  }, [senderId, receiverId, isAtBottom]);

  // Reset messages when chat changes
  useEffect(() => {
    setMessages([]);
    setPage(1);
    setHasMore(true);
  }, [receiverId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const message = { content: input, senderId, receiverId };
    socket.emit("sendMessage", message);
    setInput("");

    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: 2, height: '100vh', backgroundColor: '#fafafa' }}>
      {receiverId ? (
        <>
          <Box sx={{ p: 2, borderBottom: '1px solid #dbdbdb', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>Chat</Typography>
          </Box>

          <Box
            ref={containerRef}
            sx={{
              flexGrow: 1,
              p: 2,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              backgroundColor: '#fafafa',
            }}
          >
            {[...messages].reverse().map((msg, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: msg.sender?.id === currentUser.id ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  backgroundColor: msg.sender?.id === currentUser.id ? '#dcf8c6' : '#ffffff',
                  borderRadius: 2,
                  p: 1.5,
                  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="body1" sx={{ color: '#333' }}>{msg.content}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, p: 2, borderTop: '1px solid #dbdbdb', backgroundColor: '#ffffff' }}>
            <TextField
              fullWidth
              placeholder="Message..."
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  backgroundColor: '#f0f0f0',
                },
              }}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                backgroundColor: '#0095f6',
                '&:hover': { backgroundColor: '#007bb5' },
              }}
            >
              Send
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ p: 2, textAlign: 'center', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa' }}>
          <Typography variant="h6" sx={{ color: '#999' }}>Select a user to start chatting</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MainChat;
