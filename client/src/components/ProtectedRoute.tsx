import React from "react";
import { JSX } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    
    React.useEffect(() => {
        if (!isLoading && !isAuthenticated) {
          loginWithRedirect({
            appState: { returnTo: location.pathname },
          });
        }
      }, [isAuthenticated, isLoading, loginWithRedirect, location.pathname]);
    
      if (isLoading || !isAuthenticated) {
        return <div>Loading...</div>;
      }

    return children;
}

export default ProtectedRoute;