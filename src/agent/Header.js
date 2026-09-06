import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { getUserData } from '../getUserData';

function Header() {
  const user = getUserData();
  const name = user?.userName || user?.username || 'Agent';
  const logout = () => { localStorage.removeItem('userData'); window.location.href = '/'; };
  return <header className="agent-header">
    <Link to="/agent-dashboard" className="agent-brand"><img src="/images/renty.png" alt="Renty"/><span>renty<span>.</span></span></Link>
    <div className="agent-header-title"><span>Agent workspace</span><strong>Property management</strong></div>
    <div className="agent-header-actions">
      <Link to="/notifications" className="agent-icon-btn"><FontAwesomeIcon icon={faBell}/><i/></Link>
      <Link to="/chats" className="agent-icon-btn"><FontAwesomeIcon icon={faEnvelope}/></Link>
      <div className="agent-user"><img src="/images/person-icon.png" alt=""/><span><small>Signed in as</small><strong>{name}</strong></span></div>
      <button onClick={logout} className="agent-logout" aria-label="Log out"><FontAwesomeIcon icon={faArrowRightFromBracket}/></button>
    </div>
  </header>;
}
export default Header;
