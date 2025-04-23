import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import {
  Box,
  CssBaseline,
} from '@mui/material';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MainChat from './MainChat';
import { RootState } from '../../store';
import { syncUsers } from '../actions/user_action/syncUser';

const MessengerGrid = () => {
  const dispatch = useDispatch();

  const [senderId, setSenderId] = useState<number | null>(2);
  const [receiverId, setReceiverId] = useState<number | null>(null);

  const syncuserStatus = useSelector((state: RootState) => state.SyncUser);

  return(
    <div>
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              <CssBaseline />
              <Navbar/>
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                  <Sidebar setReceiverId={setReceiverId}/>
                  <MainChat senderId={senderId} receiverId={receiverId}/>
              </Box>
          </Box>
        </>
    </div>
  )
}

export default MessengerGrid;