import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGear, faBell, faEnvelope, faSearch, faComments, faBars, faTimes, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { getUserData } from '../getUserData';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const user = getUserData();
  const displayName = user?.userName || user?.username || 'Renty member';

  const handleSearch = (e) => {
    e?.preventDefault();
    if (query.trim()) navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <header className="user-header">
      <div className="user-header-inner">
        <Link to="/user-dashboard" className="user-brand" aria-label="Renty dashboard">
          <img src="/images/renty.png" alt="Renty" />
          <span>renty<span>.</span></span>
        </Link>

        <form className="search-bar" onSubmit={handleSearch}>
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search homes, areas or universities" autoComplete="off" />
          <button type="submit">Search</button>
        </form>

        <div className="user-header-actions">
          <Link to="/notifications" className="header-action" aria-label="Notifications"><FontAwesomeIcon icon={faBell} /><span className="notification-dot" /></Link>
          <Link to="/chats" className="header-action" aria-label="Messages"><FontAwesomeIcon icon={faEnvelope} /></Link>
          <Link to="/user-dashboard/forum" className="header-action header-forum" aria-label="Community"><FontAwesomeIcon icon={faComments} /></Link>
          <Link to="/user-dashboard/settings" className="user-profile-chip">
            <img src="/images/person-icon.png" alt="" />
            <span><small>Welcome back</small><strong>{displayName}</strong></span>
          </Link>
          <button className="logout-icon" onClick={logout} aria-label="Log out"><FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
        </div>

        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Open navigation">
          <FontAwesomeIcon icon={open ? faTimes : faBars} />
        </button>
      </div>

      {open && <div className="mobile-dashboard-menu">
        <Link to="/user-dashboard" onClick={() => setOpen(false)}><FontAwesomeIcon icon={faHome} /> Dashboard</Link>
        <Link to="/notifications" onClick={() => setOpen(false)}><FontAwesomeIcon icon={faBell} /> Notifications</Link>
        <Link to="/chats" onClick={() => setOpen(false)}><FontAwesomeIcon icon={faEnvelope} /> Messages</Link>
        <Link to="/user-dashboard/forum" onClick={() => setOpen(false)}><FontAwesomeIcon icon={faComments} /> Community</Link>
        <Link to="/user-dashboard/settings" onClick={() => setOpen(false)}><FontAwesomeIcon icon={faGear} /> Settings</Link>
        <button onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Log out</button>
      </div>}
    </header>
  );
};
export default Header;
