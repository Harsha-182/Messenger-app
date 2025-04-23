import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Authentication/Login';
import Dashboard from './components/Messenger/MessengerGrid';
import Callback from './components/Callback';
import ProtectedRoute from './components/ProtectedRoute';

const NavigationRoutes: React.FC = () => {
  return(
      <Router>
          <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" Component={Login} />
                <Route path="/callback" Component={Callback} />

                <Route path="/dashboard/" element = {
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }/>
          </Routes>
      </Router>
  )
};

export default NavigationRoutes;