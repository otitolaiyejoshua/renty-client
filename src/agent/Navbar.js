import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh, faChartLine, faBuilding, faComments, faBell, faGear, faEnvelope, faPlus, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
 const navigate=useNavigate();
 const logout=()=>{localStorage.removeItem('userData');navigate('/')};
 const links=[['/agent-dashboard','Overview',faGaugeHigh],['/agent-dashboard/properties','My properties',faBuilding],['/agent-dashboard/analytics','Analytics',faChartLine],['/chats','Messages',faEnvelope],['/notifications','Notifications',faBell],['/agent-dashboard/forum','Community',faComments],['/agent-dashboard/mysettings','Settings',faGear]];
 return <aside className="agent-sidebar">
   <div className="sidebar-label">Workspace</div>
   <nav>{links.map(([to,label,icon])=><NavLink key={to} end={to==='/agent-dashboard'} to={to} className={({isActive})=>`agent-nav-link ${isActive?'active':''}`}><FontAwesomeIcon icon={icon}/><span>{label}</span>{label==='Notifications'&&<b>•</b>}</NavLink>)}</nav>
   <button className="agent-sidebar-logout" onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket}/><span>Log out</span></button>
   <div className="sidebar-promo"><span className="promo-icon"><FontAwesomeIcon icon={faPlus}/></span><strong>Grow your listings</strong><p>Add a new property and reach more renters.</p><NavLink to="/agent-dashboard/properties">Create listing →</NavLink></div>
   <div className="sidebar-footer">Renty Agent <span>v1.0</span></div>
 </aside>;
}
export default Navbar;
