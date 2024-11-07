import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getUserData, setUserData } from '../getUserData';
import './PrivateChat.css';

const socket = io('http://localhost:5000');

const PrivateChat = () => {
    const userData = getUserData();
    const userId = userData ? userData.userId : null;
    const userName = userData ? userData.userName : null;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [receiverId, setReceiverId] = useState(userData?.receiverId || null);
    const [receiverName, setReceiverName] = useState('');
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [chats, setChats] = useState([]); // Initialize as an empty array

    useEffect(() => {
        // Load chat history
        fetch(`http://localhost:5000/api/chat/history/${userId}`)
            .then(res => res.json())
            .then(data => setChats(Array.isArray(data) ? data : [])) // Ensure data is an array
            .catch(error => {
                console.error("Error fetching chat history:", error);
                setChats([]); // Fallback to empty array on error
            });

        // Socket event to receive new private messages
        socket.on('receivePrivateMessage', (message) => {
            setMessages(prev => [...prev, message]);
        });

        return () => socket.off();
    }, [userId]);

    useEffect(() => {
        if (receiverId) {
            // Fetch messages for a selected chat
            fetch(`http://localhost:5000/api/chat/private/${userId}/${receiverId}`)
                .then(res => res.json())
                .then(data => setMessages(Array.isArray(data) ? data : [])) // Ensure data is an array
                .catch(error => {
                    console.error("Error fetching messages:", error);
                    setMessages([]); // Fallback to empty array on error
                });
        }
    }, [receiverId, userId]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() !== '' && receiverId) {
            const messageData = {
                senderId: userId,
                receiverId,
                senderName: userName,
                message: newMessage,
            };
            // Emit the message to the server
            socket.emit('sendPrivateMessage', messageData);

            // Save message in the database
            fetch('http://localhost:5000/api/chat/private', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData),
            });

            // Add message to chat
            setMessages(prev => [...prev, messageData]);
            setNewMessage('');
        }
    };

    const handleUserSelect = (user) => {
        setReceiverId(user.id);
        setReceiverName(user.name);
        setUserData({ userId, name: userName, receiverId: user.id, receiverName: user.name });
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/chat/users/${searchTerm}`);
            const data = await response.json();
            setUsers(Array.isArray(data) ? data : []); // Ensure data is an array
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); // Fallback to empty array on error
        }
    };

    return (
        <div className="private-chat-container">
            <div className="sidebar">
                <div className="search-section">
                    <h2>Search Users</h2>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by Email..."
                        className="search-input"
                    />
                    <button onClick={handleSearch} className="search-button">Search</button>
                </div>
                <div className="sidebar-header">
                    <h2>Your Chats</h2>
                </div>
                <div className="chat-list">
                    <div className="default-chat">
                        <strong>Uniconnect</strong>
                        <p>Welcome to Uniconnect support</p>
                    </div>
                    {chats.map(chat => (
                        <div
                            key={chat.receiverId}
                            onClick={() => handleUserSelect({ id: chat.receiverId, name: chat.receiverName })}
                            className="chat-item"
                        >
                            {chat.receiverName}
                        </div>
                    ))}
                </div>
                <div className="user-list">
                    {users.length > 0 ? (
                        users.map(user => (
                            <div
                                key={user.id}
                                className="user-item"
                                onClick={() => handleUserSelect(user)}
                            >
                                {user.name} ({user.email})
                            </div>
                        ))
                    ) : (
                        <div className="no-users">No users found.</div>
                    )}
                </div>
            </div>
            <div className="chat-window">
                {receiverId ? (
                    <>
                        <h2>Chat with {receiverName}</h2>
                        <div className="messages">
                            {Array.isArray(messages) && messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${msg.senderId === userId ? 'sent' : 'received'}`}
                                >
                                    <strong>{msg.senderName}:</strong> {msg.message}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage} className="message-form">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="message-input"
                            />
                            <button type="submit" className="send-button">Send</button>
                        </form>
                    </>
                ) : (
                    <div className="start-chat">
                        <h2>Select a user to start chatting</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrivateChat;
