import {
  Box,
  CssBaseline,
} from '@mui/material';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MainChat from './MainChat';

const MessengerGrid = () => {
         return(
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <CssBaseline />
                <Navbar/>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Sidebar/>
                    <MainChat/>
                </Box>
            </Box>
         )
}

export default MessengerGrid;