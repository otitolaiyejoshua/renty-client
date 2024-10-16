// frontend/src/pages/Messages.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Messages() {
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [otherUserId, setOtherUserId] = useState('');

    useEffect(() => {
        fetchChats();
        fetchUsers();
    }, []);

    const fetchChats = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/messages/chats', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setChats(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUsers = async () => {
        // Implement an API to get all users except the current user
        // For simplicity, let's assume you have such an endpoint
        try {
            const res = await axios.get('http://localhost:5000/api/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Exclude the current users
        } catch (error) {
            console.error(error);
        }
    };

    const handleStartChat = async () => {
        if (!otherUserId) {
            alert('Select a user to start chat.');
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/messages/chats', { otherUserId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Refresh chats
            fetchChats();
        } catch (error) {
            console.error(error);
            alert('Failed to start chat.');
        }
    };

    return (
        <div>
            <h2>Your Chats</h2>
            <ul>
                {chats.map(chat => (
                    <li key={chat.id}>
                        <Link to={`/chat/${chat.id}`}>{chat.username}</Link>
                    </li>
                ))}
            </ul>

            <hr />

            <h3>Start a New Chat</h3>
            <select value={otherUserId} onChange={(e) => setOtherUserId(e.target.value)}>
                <option value="">Select User</option>
                {users.map(u => (
                    <option key={u.id} value={u.id}>{u.username}</option>
                ))}
            </select>
            <button onClick={handleStartChat}>Start Chat</button>
        </div>
    );
}

export default Messages;
