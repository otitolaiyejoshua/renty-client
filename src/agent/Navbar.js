// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import {Mail,Assessment,Payment,Notifications,Apartment,Forum,Settings} from '@material-ui/icons';
function Navbar() {
    return (
        <nav className="agent-navbar">
            <ul className="nav-container">
                <li className="nav-list"><Link className="alinks" to="/agent-dashboard/analytics"><Assessment className="icons"/>Analytics</Link></li>
                <li className="nav-list"><Link className="alinks" to="/agent-dashboard/payments"><Payment className="icons"/>Payments</Link></li>
                <li className="nav-list"><Link className="alinks" to="/messages"><Mail className="icons"/>Messages</Link></li>
                <li className="nav-list"><Link className="alinks" to="/notifications"><Notifications className="icons"/>Notifications</Link></li>
                <li className="nav-list"><Link className="alinks" to="/agent-dashboard/properties"><Apartment className="icons"/>Properties</Link></li>
                <li className="nav-list"><Link className="alinks" to="/forum"><Forum className="icons"/>Forum</Link></li>
                <li className="nav-list"><Link className="alinks" to="/agent-dashboard/mysettings"><Settings className="icons"/>Settings</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
