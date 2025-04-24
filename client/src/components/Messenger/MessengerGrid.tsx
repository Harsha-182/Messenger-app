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

return(
    <div>
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              <CssBaseline />
              <Navbar/>
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                  <Sidebar setActiveChatId={setActiveChatId}/>
                  <MainChat receiverId={activeChatId}/>
              </Box>
          </Box>
        </>
    </div>
  )
}

export default MessengerGrid;