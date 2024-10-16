import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserData } from '../getUserData'; // Adjust the path as necessary

function AgentSettings() {
    const [profile, setProfile] = useState({
        username: '',
        phonenumber: '',
        agency_name: '',
        idDocument: null,
        ownershipCertificate: null
    });

    const [form, setForm] = useState({
        username: '',
        phonenumber: '',
        agency_name: '',
        currentPassword: '',
        newPassword: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [filesExist, setFilesExist] = useState(false);
    const [agencyNameExists, setAgencyNameExists] = useState(false);

    // Retrieve token and user info from localStorage
    const userData = getUserData();
    const token = userData ? userData.token : null;
    const agentId = userData ? userData.userId : null;

    useEffect(() => {
        const fetchProfile = async () => {
            if (!agentId) {
                setError('Agent ID not found.');
                return;
            }
    
            try {
                const res = await axios.get(`http://localhost:5000/api/agentSettings/${agentId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfile({
                    username: res.data.username || '',
                    phonenumber: res.data.phonenumber || '',
                    agency_name: res.data.agency_name || '',
                    idDocument: res.data.idDocument || '',
                    ownershipCertificate: res.data.ownershipCertificate || ''
                });
                setForm({
                    username: res.data.username || '',
                    phonenumber: res.data.phonenumber || '',
                    agency_name: res.data.agency_name || '',
                    currentPassword: '',
                    newPassword: ''
                });
                setFilesExist(res.data.documentsExist); 
                setAgencyNameExists(res.data.agencyNameExists); 
            } catch (err) {
                console.error(err);
                setError('Failed to fetch agent profile');
            }
        };
    
        if (token) {
            fetchProfile();
        } else {
            setError('No authentication token found');
        }
    }, [token, agentId]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setProfile({
                ...profile,
                [name]: files[0] // Only store the first file
            });
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const formData = new FormData();
        formData.append('username', form.username);
        formData.append('phonenumber', form.phonenumber);
        formData.append('agency_name', form.agency_name);
        formData.append('idDocument', profile.idDocument);
        formData.append('ownershipCertificate', profile.ownershipCertificate);

        try {
            const res = await axios.put(`http://localhost:5000/api/agentSettings/profile`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(res.data.message);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to update agent profile');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const res = await axios.put(`http://localhost:5000/api/agentSettings/password`, {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage(res.data.message);
            setForm({
                ...form,
                currentPassword: '',
                newPassword: ''
            });
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to change password');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Agent Settings</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Profile Information Section */}
            <form onSubmit={handleProfileUpdate} style={{ marginBottom: '30px' }}>
                <h3>Profile Information</h3>
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
                        name="phonenumber"
                        value={form.phonenumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Agency Name:
                    <input
                        type="text"
                        name="agency_name"
                        value={form.agency_name}
                        onChange={handleChange}
                        required={!agencyNameExists}
                    />
                </label>
                <br />
                <label>
                    Government Issued ID:
                    <input
                        type="file"
                        name="idDocument"
                        accept="image/*"
                        onChange={handleFileChange}
                        required={!filesExist}
                    />
                </label>
                <br />
                <label>
                    Certificate of Ownership:
                    <input
                        type="file"
                        name="ownershipCertificate"
                        accept="image/*"
                        onChange={handleFileChange}
                        required={!filesExist}
                    />
                </label>
                <br />
                {!filesExist && (
                    <p style={{ color: 'orange' }}>
                        To receive payments, you need to upload your Government Issued ID and Certificate of Ownership.
                    </p>
                )}
                {!agencyNameExists && (
                    <p style={{ color: 'orange' }}>
                        You need to provide your agency name to receive payments.
                    </p>
                )}
                <button type="submit">Update Profile</button>
            </form>

            <hr />

            {/* Change Password Section */}
            <form onSubmit={handlePasswordChange}>
                <h3>Change Password</h3>
                <label>
                    Current Password:
                    <input
                        type="password"
                        name="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    New Password:
                    <input
                        type="password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default AgentSettings;
