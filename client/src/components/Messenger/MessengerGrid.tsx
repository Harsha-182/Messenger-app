import { useState } from 'react';

import {
  Box,
  CssBaseline,
} from '@mui/material';

import Sidebar from './Sidebar';
import MainChat from './MainChat';

const MessengerGrid = () => {
  const [activeChatId, setActiveChatId] = useState<{id: number; name: string, picture: string} | null >(null);
  const [unreadCounts, setUnreadCounts] = useState<{ [userId: number]: number }>({}); 
return(
    <div>
        <>
          <Box sx={{ display: 'flex',
		  			Font: 'Work Sans', 
					flexDirection: 'column', 
					height: '100vh', 
					overflowY: 'hidden',
					"&::-webkit-scrollbar": {
						display: "none",
					},

					// Hide scrollbar for Firefox
					scrollbarWidth: "none",
				}}>
              <CssBaseline />
			  {/* <Navbar/> */}
			  <Box sx={{ display: {lg:'flex'}, flexDirection: { lg: 'row' } }}>
				  <Sidebar
					setActiveChatId={setActiveChatId}
					unreadCounts={unreadCounts}
				  />
				  <MainChat
					receiverId={activeChatId}
					setUnreadCounts={setUnreadCounts}
					unreadCounts={unreadCounts}
				  />
			  </Box>
          </Box>
        </>
    </div>
  )
}

export default MessengerGrid;