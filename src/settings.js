import React, {useEffect, useState} from 'react';
import api from './api/api';
import {getUserData} from './getUserData';
import {Link, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen,faShieldHalved,faArrowRightFromBracket,faCreditCard} from '@fortawesome/free-solid-svg-icons';
import Header from './user/Header';
import './Settings.css';
import './user/UserDashboard.css';

function Settings(){
 const [email,setEmail]=useState(''),[username,setUsername]=useState(''),[error,setError]=useState('');
 const user=getUserData(), token=user?.token,userId=user?.userId,navigate=useNavigate();
 useEffect(()=>{if(!token||!userId){setError('Your session could not be verified. Please sign in again.');return}api.get(`/api/userSettings/${userId}`,{headers:{Authorization:`Bearer ${token}`}}).then(r=>{setEmail(r.data.email||'');setUsername(r.data.username||'')}).catch(e=>{console.error(e);setError('We could not load your profile right now.')})},[token,userId]);
 const logout=()=>{localStorage.removeItem('userData');navigate('/')};
 return <div className="user-dashboard-container"><Header/><main className="user-dashboard-main"><div className="renty-user-settings"><p className="renty-settings-eyebrow">Account</p><h1>Settings</h1><p className="renty-settings-subtitle">Manage your profile, security and Renty account preferences.</p>{error&&<div className="renty-settings-card renty-settings-error">{error}</div>}
 <section className="renty-settings-card"><h3>Profile information</h3><p>Your basic Renty account details.</p><div className="renty-profile-row"><img className="renty-profile-avatar" src="/images/person-icon.png" alt=""/><div className="renty-profile-copy"><strong>{username||'Renty member'}</strong><span>{email}</span></div></div><div className="renty-setting-actions"><Link className="renty-setting-btn" to="/user-dashboard/edit-information"><FontAwesomeIcon icon={faPen}/> &nbsp; Edit information</Link></div></section>
 <section className="renty-settings-card"><h3>Payments & bookings</h3><p>Your booking and payment activity stays connected to the Renty platform.</p><div className="renty-payment-info"><FontAwesomeIcon icon={faCreditCard}/><div><strong>Secure booking payments</strong><span>Payment receipts are available after successful bookings.</span></div></div></section>
 <section className="renty-settings-card"><h3>Security</h3><p>Simple steps to keep your account protected.</p><div className="renty-payment-info"><FontAwesomeIcon icon={faShieldHalved}/><div><strong>Account protection</strong><span>Use a strong password and never share your login credentials.</span></div></div></section>
 <section className="renty-settings-card"><h3>Session</h3><p>Sign out when you are finished using Renty on this device.</p><div className="renty-setting-actions"><button className="renty-setting-btn danger" onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket}/> &nbsp; Log out</button></div></section>
 </div></main></div>;
}
export default Settings;
