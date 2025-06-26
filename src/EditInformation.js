// EditInformation.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserData } from './getUserData'; // Adjust the path as necessary
import './EditInformation.css'; // Optional CSS for styling

function EditInformation() {
    const userData = getUserData();
    const token = userData ? userData.token : null;
    const userId = userData ? userData.userId : null;

    const [form, setForm] = useState({
        username: '',
        email: '',
        currentPassword: '',
        newPassword: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`https://uniconnect.africa/api/userSettings/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setForm({
                    username: res.data.username,
                    email: res.data.email,
                    currentPassword: '',
                    newPassword: ''
                });
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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const res = await axios.put(`https://uniconnect.africa/api/userSettings/profile`, {
                username: form.username,
                email: form.email
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setMessage(res.data.message);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    return (
        <div className="edit-info-container">
            <h2>Edit Information</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleProfileUpdate}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default EditInformation;
