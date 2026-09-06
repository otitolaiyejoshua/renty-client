import React from 'react';
import {Link} from 'react-router-dom';
import {getUserData} from './getUserData';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell,faArrowLeft,faMessage,faHouse,faCalendarCheck,faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import './notifications.css';

function Notifications(){const user=getUserData();const dashboard=user?.role==='agent'?'/agent-dashboard':'/user-dashboard';return <div className="renty-notifications-page"><header className="renty-notifications-header"><Link to={dashboard}><FontAwesomeIcon icon={faArrowLeft}/> Dashboard</Link><div><img src="/images/renty.png" alt="Renty"/><strong>renty<span>.</span></strong></div></header><main><div className="renty-notifications-title"><div className="renty-notification-mark"><FontAwesomeIcon icon={faBell}/></div><div><p>Activity center</p><h1>Notifications</h1><span>Stay on top of messages, bookings and important Renty updates.</span></div></div><section className="renty-notification-card"><div className="renty-notification-card-head"><div><h2>Recent activity</h2><p>Your latest Renty events will appear here.</p></div><span>All caught up</span></div><div className="renty-notification-empty"><div><FontAwesomeIcon icon={faBell}/></div><h3>No new notifications</h3><p>When you receive a message, booking update or account alert, you'll see it here.</p><div className="renty-notification-links"><Link to="/chats"><FontAwesomeIcon icon={faMessage}/> Messages</Link><Link to={dashboard}><FontAwesomeIcon icon={faHouse}/> Dashboard</Link></div></div></section></main></div>}
export default Notifications;
