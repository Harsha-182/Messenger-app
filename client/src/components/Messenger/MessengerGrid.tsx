import { useState } from 'react';

import {
  Box,
  CssBaseline,
} from '@mui/material';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MainChat from './MainChat';

const MessengerGrid = () => {
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<{ [userId: number]: number }>({}); 
return(
    <div>
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              <CssBaseline />
              <Navbar/>
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                  <Sidebar 
                    setActiveChatId={setActiveChatId} 
                    unreadCounts={unreadCounts}
                  />
                  <MainChat 
                    receiverId={activeChatId}
                    setUnreadCounts={setUnreadCounts}
                  />
              </Box>
          </Box>
        </>
    </div>
  )
}

export default MessengerGrid;