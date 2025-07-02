// agent/AgentDashboard.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import WelcomeMessage from './WelcomeMessage';
import './agent.css';

function AgentDashboard() {
  const location = useLocation();
  const isDashboardRoot = location.pathname === '/agent-dashboard';

  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        <Navbar />
        <div className="content">
          {isDashboardRoot && <WelcomeMessage />}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AgentDashboard;
