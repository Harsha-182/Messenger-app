import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Callback = () => {
    const { isLoading, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleAuth = async () => {
          try {
            if (isLoading) return;
            if (isAuthenticated) {
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
      }, [isLoading, isAuthenticated, navigate]);
    
    return (
        <div> Loading... </div>
    )
}

export default Callback;