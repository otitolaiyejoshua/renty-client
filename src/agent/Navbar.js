// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faChartLine, faDollarSign, faBell, faBuilding, faComments, faCog } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    return (
        <nav className="agent-navbar">
            <ul className="nav-container">
                <li className="nav-list">
                    <Link className="alinks" to="/agent-dashboard/analytics">
                        <FontAwesomeIcon icon={faChartLine} className="icons" /> Analytics
                    </Link>
                </li>
                <li className="nav-list">
                    <Link className="alinks" to="/agent-dashboard/payments">
                        <FontAwesomeIcon icon={faDollarSign} className="icons" /> Payments
                    </Link>
                </li>
                <li className="nav-list">
                    <Link className="alinks" to="/chats">
                        <FontAwesomeIcon icon={faEnvelope} className="icons" /> Messages
                    </Link>
                </li>
                <li className="nav-list">
                    <Link className="alinks" to="/notifications">
                        <FontAwesomeIcon icon={faBell} className="icons" /> Notifications
                    </Link>
                </li>
                <li className="nav-list">
                    <Link className="alinks" to="/agent-dashboard/properties">
                        <FontAwesomeIcon icon={faBuilding} className="icons" /> Properties
                    </Link>
                </li>
                <li className="nav-list">
                    <Link className="alinks" to="/forum">
                        <FontAwesomeIcon icon={faComments} className="icons" /> Forum
                    </Link>
                </li>
                <li className="nav-list">
                    <Link className="alinks" to="/agent-dashboard/mysettings">
                        <FontAwesomeIcon icon={faCog} className="icons" /> Settings
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
