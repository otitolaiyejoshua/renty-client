import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { getUserData, setUserData } from '../getUserData';
import './PrivateChat.css';

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
    const [chats, setChats] = useState([]);
    
    // Use a ref to store the socket instance
    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize socket connection only once
        socketRef.current = io('https://renty-server.onrender.com');

        // Retrieve chats from local storage when the component mounts
        const storedChats = JSON.parse(localStorage.getItem('recentChats')) || [];
        setChats(storedChats);

        // Load chat history for the user
        fetch(`https://renty-server.onrender.com/api/chat/history/${userId}`)
            .then(res => res.json())
            .then(data => {
                const uniqueChats = Array.isArray(data) ? [...new Set([...storedChats, ...data])] : storedChats;
                setChats(uniqueChats);
                localStorage.setItem('recentChats', JSON.stringify(uniqueChats)); // Update local storage
            })
            .catch(error => console.error("Error fetching chat history:", error));

        // Socket event to receive new private messages
        socketRef.current.on('receivePrivateMessage', (message) => {
            setMessages(prev => [...prev, message]);
        });

        // Cleanup function
        return () => {
            socketRef.current.off();
            socketRef.current.disconnect();
        };
    }, [userId]);

    useEffect(() => {
        if (receiverId) {
            // Fetch messages for a selected chat
            fetch(`https://renty-server.onrender.com/api/chat/private/${userId}/${receiverId}`)
                .then(res => res.json())
                .then(data => setMessages(Array.isArray(data) ? data : []))
                .catch(error => console.error("Error fetching messages:", error));
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
            socketRef.current.emit('sendPrivateMessage', messageData);

            fetch('https://renty-server.onrender.com/api/chat/private', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData),
            });

            setMessages(prev => [...prev, messageData]);
            setNewMessage('');

            // Save chat to recent chats and local storage
            const updatedChats = [...chats.filter(chat => chat.receiverId !== receiverId), { receiverId, receiverName }];
            setChats(updatedChats);
            localStorage.setItem('recentChats', JSON.stringify(updatedChats));
        }
    };

    const handleUserSelect = (user) => {
        setReceiverId(user.id);
        setReceiverName(user.name);
        setUserData({ userId, name: userName, receiverId: user.id, receiverName: user.name });

        // Add selected user to recent chats and update local storage
        const updatedChats = [...chats.filter(chat => chat.receiverId !== user.id), { receiverId: user.id, receiverName: user.name }];
        setChats(updatedChats);
        localStorage.setItem('recentChats', JSON.stringify(updatedChats));
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://renty-server.onrender.com/api/chat/users/${searchTerm}`);
            const data = await response.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
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
                        <strong>Renty</strong>
                        <p>Welcome to Renty support</p>
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
                            {messages.map((msg, index) => (
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
