// frontend/src/pages/Chat.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Chat() {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchMessages();
    }, [chatId]);

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/messages/chats/${chatId}/messages`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessages(res.data);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch messages.');
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            await axios.post(`http://localhost:5000/api/messages/chats/${chatId}/messages`, { content }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setContent('');
            fetchMessages();
        } catch (error) {
            console.error(error);
            alert('Failed to send message.');
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{ margin: '10px 0' }}>
                        <strong>{msg.sender_username}</strong>: {msg.content} <br />
                        <small>{new Date(msg.created_at).toLocaleString()}</small>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend}>
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type your message..." required />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;
