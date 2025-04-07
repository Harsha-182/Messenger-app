import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Authentication/Login';
import Dashboard from './components/Messenger/MessengerGrid';

const NavigationRoutes: React.FC = () => {
  return(
      <Router>
          <Routes>
              <Route path="/login" Component={Login} />
              <Route path="/dashboard/" Component={Dashboard}/>
          </Routes>
      </Router>
  )
};

export default NavigationRoutes;