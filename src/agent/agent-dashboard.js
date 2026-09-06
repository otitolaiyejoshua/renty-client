import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import WelcomeMessage from './WelcomeMessage';
import './agent.css';

function AgentDashboard() {
  const location = useLocation();
  const isDashboardRoot = location.pathname === '/agent-dashboard' || location.pathname === '/agent-dashboard/';
  return <div className="agent-app">
    <Header />
    <div className="agent-body">
      <Navbar />
      <main className="agent-content">
        {isDashboardRoot ? <WelcomeMessage /> : <Outlet />}
      </main>
    </div>
  </div>;
}
export default AgentDashboard;
