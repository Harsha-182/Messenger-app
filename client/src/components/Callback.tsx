import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import { syncUsers } from './actions/user_action/syncUser';
import { AppDispatch } from '../store';

const Callback = () => {
    const { getAccessTokenSilently, isLoading, isAuthenticated, user } = useAuth0();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const handleAuth = async () => {
          try {
            if (isLoading) return;
            if (isAuthenticated) {
                const token = await getAccessTokenSilently();
                let formData = {...user};

                await dispatch(syncUsers(formData, token));

                navigate('/dashboard/');
            } else {
              navigate('/login');
            }
          } catch (error) {
            console.error("Error during Auth0 authentication:", error);
            navigate('/login');
          }
        };
    
        handleAuth();
      }, [isLoading, isAuthenticated, navigate, getAccessTokenSilently]);
    
    return (
        <div> Loading... </div>
    )
}

export default Callback;