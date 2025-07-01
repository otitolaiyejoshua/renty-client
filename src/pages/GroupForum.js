import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import './GroupForum.css'; // Add your CSS styles here
import { getUserData } from '../getUserData';

const socket = io('https://renty-server.onrender.com'); // Update with the production API URL

const GroupForum = () => {
    const userData = getUserData();
    const userId = userData ? userData.userId : null;
    const userName = userData ? userData.userName : null;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatBoxRef = useRef(null);

    useEffect(() => {
        // Fetch previous group messages from the backend
        fetch('https://renty-server.onrender.com/api/chat/group')
            .then(res => res.json())
            .then(data => setMessages(data));

        // Listen for new messages from the server (real-time)
        socket.on('receiveGroupMessage', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        // Cleanup when the component unmounts
        return () => socket.off('receiveGroupMessage'); // Make sure to clean up the listener
    }, []);

    useEffect(() => {
        // Scroll to the bottom whenever a new message is added
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() !== '') {
            const messageData = {
                userId,
                userName,
                message: newMessage,
                timestamp: new Date().toLocaleTimeString(),
            };
            // Emit the new message to the server
            socket.emit('sendGroupMessage', messageData);
            setNewMessage(''); // Clear input after sending
        }
    };

    return (
        <div className="group-forum-container">
            <div className="chat-header">
                <h2>Uniconnect Forum</h2>
            </div>
            <div className="chat-box" ref={chatBoxRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`message-container ${msg.userId === userId ? 'own-message' : 'other-message'}`}>
                        <div className="message-avatar">
                            <img
                                src={`https://ui-avatars.com/api/?name=${msg.userName}&background=007bff&color=fff`}
                                alt="avatar"
                            />
                        </div>
                        <div className="message-content">
                            <div className="message-info">
                                <span className="message-user">{msg.userName}</span>
                                <span className="message-timestamp">{msg.timestamp}</span>
                            </div>
                            <div className="message-text">
                                {msg.message}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <form className="chat-input-form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="chat-input"
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
};

export default GroupForum;
