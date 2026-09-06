import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCalendarCheck, faChartLine, faMessage, faArrowUpRightDots, faPlus } from '@fortawesome/free-solid-svg-icons';
import api from '../api/api';
import { getUserData } from '../getUserData';
import './WelcomeMessage.css';

const WelcomeMessage=()=>{
 const [count,setCount]=useState(0); const user=getUserData(); const name=user?.userName||user?.username||'Agent';
 useEffect(()=>{const run=async()=>{try{const r=await api.get(`/api/properties/${user?.userId}`,{headers:{'x-access-token':user?.token}});setCount(Array.isArray(r.data)?r.data.length:0)}catch(e){console.error(e)}}; if(user?.userId)run()},[user?.userId,user?.token]);
 return <div className="agent-overview">
  <div className="agent-overview-top"><div><p className="agent-eyebrow">Agent overview</p><h1>Good to see you, {name.split(' ')[0]}.</h1><p>Manage your listings, track performance and stay on top of renter activity.</p></div><Link className="agent-primary-btn" to="/agent-dashboard/properties"><FontAwesomeIcon icon={faPlus}/> &nbsp; Add property</Link></div>
  <div className="agent-metric-grid">
   <div className="agent-metric"><div className="agent-metric-head"><span>Total properties</span><span className="agent-metric-icon"><FontAwesomeIcon icon={faBuilding}/></span></div><strong>{count}</strong><small>Active listings in your portfolio</small></div>
   <div className="agent-metric"><div className="agent-metric-head"><span>Bookings</span><span className="agent-metric-icon"><FontAwesomeIcon icon={faCalendarCheck}/></span></div><strong>0</strong><small>Bookings received</small></div>
   <div className="agent-metric"><div className="agent-metric-head"><span>Inspections</span><span className="agent-metric-icon"><FontAwesomeIcon icon={faArrowUpRightDots}/></span></div><strong>0</strong><small>Inspection requests</small></div>
   <div className="agent-metric"><div className="agent-metric-head"><span>Messages</span><span className="agent-metric-icon"><FontAwesomeIcon icon={faMessage}/></span></div><strong>0</strong><small>Unread conversations</small></div>
  </div>
  <div className="agent-panels">
   <div className="agent-panel"><h3>Performance snapshot</h3><p className="agent-panel-sub">A quick view of how your Renty workspace is doing.</p><div className="agent-chart-placeholder"><div className="chart-line"><span/><span/><span/><span/><span/><span/></div><div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div></div></div>
   <div className="agent-panel"><h3>Recent activity</h3><p className="agent-panel-sub">Your latest workspace activity.</p><div className="agent-activity"><div className="agent-activity-item"><span className="agent-activity-icon"><FontAwesomeIcon icon={faBuilding}/></span><div><strong>Properties are ready to manage</strong><span>Visit My Properties to edit or add listings.</span></div></div><div className="agent-activity-item"><span className="agent-activity-icon"><FontAwesomeIcon icon={faChartLine}/></span><div><strong>Analytics is ready</strong><span>Track your listing portfolio performance.</span></div></div></div></div>
  </div>
 </div>;
}; export default WelcomeMessage;
