import React, {useEffect, useState} from 'react';
import {
  Box,
  CssBaseline,
} from '@mui/material';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MainChat from './MainChat';
 
const MessengerGrid = () => {
  const [senderId, setSenderId] = useState<number | null>(2);
  const [receiverId, setReceiverId] = useState<number | null>(null);

  console.log("receiverId", receiverId)
         return(
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <CssBaseline />
                <Navbar/>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Sidebar setReceiverId={setReceiverId}/>
                    <MainChat senderId={senderId} receiverId={receiverId}/>
                </Box>
            </Box>
         )
}

export default MessengerGrid;