// agent/agent-dashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Header from './Header'; // Ensure correct import
import Navbar from './Navbar'; // Ensure correct import
import './agent.css';

function AgentDashboard() {
    return (
        <div className="app-container">
            <Header />
            <div className="main-container">
                <Navbar />
                <div className="content">
                    <Outlet /> {/* Renders nested routes */}
                </div>
            </div>
        </div>
    );
}

export default AgentDashboard;
