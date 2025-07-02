import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserData } from './getUserData'; // Adjust the path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Settings.css'; // Assuming you have a CSS file for styling

function Settings() {
    const [email, setemail] = useState('');
    const [username, setUsername] = useState('');
    const userData = getUserData();
    const token = userData ? userData.token : null;
    const userId = userData ? userData.userId : null;
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`https://renty-server.onrender.com/api/userSettings/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setemail(res.data.email);
                setUsername(res.data.username);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch profile');
            }
        };

        if (token) {
            fetchProfile();
        } else {
            setError('No authentication token found');
        }
    }, [token, userId]);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        window.location.href = '/'; // Redirect to home
    };

    return (
        <div className="settings-container">
            <h2>User Settings</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="profile-info">
                <h3>Profile Information</h3>
                <div className="profile-detail">
                    <span>Username: {username}</span>
                </div>
                <div className="profile-detail">
                    <span>Phone Number: {email}</span>
                </div>
                <Link to="/user-dashboard/edit-information">
                    <button>Edit Information</button>
                </Link>
                <button onClick={() => (window.location.href = '/payments')}>Payment History</button>
                <button className="logout-button" onClick={handleLogout}>
                    Logout <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
            </div>
        </div>
    );
}

export default Settings;
