import { useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';
import { AppDispatch } from '../../store'; // Adjust the path based on your project structure

import { Box, Button, TextField, Typography } from "@mui/material"
import { socket } from "../socket";
import { getMessages } from "../actions/message_action/getMessages";
import { RootState } from '../../store';

interface Message {
  id?: number
  content: string
  senderId: number
  receiverId: number
  sender?: {
    id: number
    name: string
    password: string
    email: string
    age: number
  }
  receiver?: {
    id: number
    name: string
    password: string
    email: string
    age: number
  }
}

interface MainChatProps {
  senderId: number | null;
  receiverId: number | null;
}

const MainChat:React.FC<MainChatProps> = ({senderId, receiverId}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>("");

  const messageStatus = useSelector((state: RootState) => state.Message);
  
  useEffect(() => {
    if (senderId && receiverId) {
      dispatch(getMessages({ senderId, receiverId }));
    }
  }, [senderId, receiverId]);

  useEffect(() => {
    setMessages(messageStatus.data);
  }, [messageStatus]);
  
  useEffect(() => {
    socket.on("newMessage", (msg: Message) => {
      setMessages(prev => [...prev, msg])
    })

    return () => {
      socket.off("newMessage")
    }
  }, [])

  const sendMessage = () => {
    let message = {content: input, senderId, receiverId}
    socket.emit("sendMessage", message);
    setInput("");
  }

    return(
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#fafafa' }}>
          {
            receiverId && (
              <>
          <Box
            sx={{
              p: 2,
              borderBottom: '1px solid #dbdbdb',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Chat
            </Typography>
          </Box>

          <Box
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
            {messages?.map((msg, index) => (
              <Box
                key={index}
                sx={{
            alignSelf: msg.senderId === senderId ? 'flex-end' : 'flex-start',
            maxWidth: '70%',
            backgroundColor: msg.senderId === senderId ? '#dcf8c6' : '#ffffff',
            borderRadius: 2,
            p: 1.5,
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography
            variant="body2"
            sx={{ color: '#555', fontWeight: 500, mb: 0.5 }}
                >
            {msg.receiver?.name || 'Unknown'}
                </Typography>
                <Typography variant="body1" sx={{ color: '#333' }}>
            {msg.content}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              p: 2,
              borderTop: '1px solid #dbdbdb',
              backgroundColor: '#ffffff',
            }}
          >
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
                '&:hover': {
            backgroundColor: '#007bb5',
                },
              }}
            >
              Send
            </Button>
          </Box>
              </>
            )
          }
          {
            !receiverId && (
              <Box
          sx={{
            p: 2,
            textAlign: 'center',
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
          }}
              >
          <Typography variant="h6" sx={{ color: '#999' }}>
            Select a user to start chatting
          </Typography>
              </Box>
            )
          }
        </Box>
    )
}

export default MainChat;