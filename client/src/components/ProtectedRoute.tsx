import React, { use, useEffect } from "react";
import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch,useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store";
import { syncUsers } from "./actions/user_action/syncUser";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, user } = useAuth0();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const syncUserStatus = useSelector((state: RootState) => state.SyncUser);

    useEffect(() => {
        const syncUserIfNeeded = async () => {
            if (isAuthenticated && user && !localStorage.getItem("userInfo")) {
              try {
                const token = await getAccessTokenSilently();
                let formData = {...user};
                await dispatch(syncUsers(formData, token));
              } catch (err) {
                console.error("Failed to sync user:", err);
              }
            }
        };
        if (!isLoading) {
            if (!isAuthenticated) {
              loginWithRedirect({ appState: { returnTo: location.pathname } });
            } else {
              syncUserIfNeeded();
            }
          }
    }, [isAuthenticated, isLoading, loginWithRedirect, location.pathname, user, getAccessTokenSilently, dispatch]);
    
    useEffect(() => {
        if(syncUserStatus && syncUserStatus.data) {
            localStorage.setItem("userInfo", JSON.stringify(syncUserStatus.data));
        }
    }, [syncUserStatus]);

    if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>;
    }

    return children;
}

export default ProtectedRoute;