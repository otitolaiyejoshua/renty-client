// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faGear, 
  faBell, 
  faEnvelope, 
  faSearch, 
  faPaperPlane, 
  faBars, // Font Awesome icon for the hamburger menu
  faTimes // Font Awesome icon for the close menu
} from '@fortawesome/free-solid-svg-icons'; // Ensure to import the correct icons

const Header = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle search submission
  const handleSearch = async () => {
    if (query.trim() === '') {
      return;
    } else {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  // Toggle navigation menu (for mobile or responsive design)
  const toggleNav = () => {
    setOpen(!open);
  };

  return (
    <header className="user-header">
      <div className="header-left">
        <Link to="/" className="logo">
          <img src="images/renty.png" alt="Logo" />
        </Link>
        <div className="search-bar">
          <input
            type="text"
            value={query}
            className="search-box"
            onChange={handleInputChange}
            placeholder="Search by university..."
            autoComplete="off"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            onClick={handleSearch}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      <span className="hamburger" onClick={toggleNav}>
        {open ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </span>
      <ul className={`nav-drop ${open ? 'open' : ''}`}>
        <li className="nav-drop-list">
          <Link to="/user-dashboard" className="dlinks">
            <FontAwesomeIcon icon={faHome} className="dicon" />
          </Link>
          <span className="dlabel">Home</span>
        </li>
        <li className="nav-drop-list">
          <Link to="/notifications" className="dlinks">
            <FontAwesomeIcon icon={faBell} className="dicon" />
          </Link>
          <span className="dlabel">Notifications</span>
        </li>
        <li className="nav-drop-list">
          <Link to="/chats" className="dlinks">
            <FontAwesomeIcon icon={faEnvelope} className="dicon" />
          </Link>
          <span className="dlabel">Messages</span>
        </li>
        <li className="nav-drop-list">
          <Link to="/forum" className="dlinks">
            <FontAwesomeIcon icon={faPaperPlane} className="dicon" />
          </Link>
          <span className="dlabel">Forum</span>
        </li>
        <li className="nav-drop-list">
          <Link to="/user-dashboard/settings" className="dlinks">
            <FontAwesomeIcon icon={faGear} className="dicon" />
          </Link>
          <span className="dlabel">Settings</span>
        </li>
      </ul>
      <div className="header-right">
        <Link to="/notifications">
          <FontAwesomeIcon icon={faBell} className="icon" />
        </Link>
        <Link to="/chats">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
        </Link>
        <Link to="/forum">
          <FontAwesomeIcon icon={faPaperPlane} className="icon" />
        </Link>
        <Link to="/user-dashboard/settings">
          <FontAwesomeIcon icon={faGear} className="icon" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
