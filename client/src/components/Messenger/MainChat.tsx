import { useState, useEffect} from "react";

import { Box, Button, TextField, Typography } from "@mui/material"
import { socket } from "../socket";

interface Message {
  id?: number
  content: string
  senderId: number
  receiverId: number
  sender?: {
    id: number
    username: string
    password: string
    email: string
    age: number
  }
  receiver?: {
    id: number
    username: string
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
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>("");

  // const senderId = 2
  // const receiverId = 3

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

  console.log("recieverId from MainChat.jsx", receiverId)
    return(
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* <Box sx={{ p: 2, borderBottom: '1px solid #ccc', backgroundColor: '#ededed' }}>
            <Typography variant="h6">Chat with Test1</Typography>
          </Box> */}

          {
            receiverId && (
              <>
                <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
                  {messages?.map((msg, index) => (
                    <Typography key={index}>
                      <strong>{msg.sender?.username || "Unknown"}:</strong>
                      {msg.content}
                    </Typography>
                  ))}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    p: 2,
                    borderTop: '1px solid #ccc',
                    backgroundColor: '#fafafa',
                  }}
                >
                  <TextField
                    fullWidth 
                    placeholder="Type a message" 
                    size="small"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  />
                  <Button variant="contained" onClick={sendMessage}>Send</Button>
                </Box>
              </>
            )
          }
          {
            !receiverId && (
              <Box sx={{ p: 2, textAlign: 'center', flexGrow: 1 }}>
                <Typography variant="h6">Select a user to chat</Typography>
              </Box>
            )
          }
        </Box>  
    )
}

export default MainChat;