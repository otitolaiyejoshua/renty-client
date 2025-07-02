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
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

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

      {/* Mobile Dropdown Nav */}
      <ul className={`nav-drop ${open ? 'open' : ''}`}>
        <li className="nav-drop-list">
          <Link to="/user-dashboard" className="dlinks">
            <FontAwesomeIcon icon={faHome} className="dicon" />
            <span className="dlabel">Home</span>
          </Link>
        </li>
        <li className="nav-drop-list">
          <Link to="/notifications" className="dlinks">
            <FontAwesomeIcon icon={faBell} className="dicon" />
            <span className="dlabel">Notifications</span>
          </Link>
        </li>
        <li className="nav-drop-list">
          <Link to="/chats" className="dlinks">
            <FontAwesomeIcon icon={faEnvelope} className="dicon" />
            <span className="dlabel">Messages</span>
          </Link>
        </li>
        <li className="nav-drop-list">
          <Link to="/forum" className="dlinks">
            <FontAwesomeIcon icon={faPaperPlane} className="dicon" />
            <span className="dlabel">Forum</span>
          </Link>
        </li>
        <li className="nav-drop-list">
          <Link to="/user-dashboard/settings" className="dlinks">
            <FontAwesomeIcon icon={faGear} className="dicon" />
            <span className="dlabel">Settings</span>
          </Link>
        </li>
      </ul>

      {/* Desktop Icons */}
      <div className="header-right">
        <Link to="/chats">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
        </Link>
        <Link to="/user-dashboard/forum">
          <FontAwesomeIcon icon={faPaperPlane} className="icon" />
        </Link>
        <Link to="/user-dashboard/settings">
          <FontAwesomeIcon icon={faGear} className="icon" />
        </Link>
        <Link to="/user-dashboard/settings">
          <FontAwesomeIcon icon={faGear} className="icon" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
