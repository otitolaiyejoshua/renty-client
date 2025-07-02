import React, { useEffect, useState, useRef } from 'react';
import './GroupForum.css';
import socket from '../socket';
import { getUserData } from '../getUserData';

const GroupForum = () => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const data = getUserData();
    setUserData(data);

    // Connect socket only once when component mounts
    socket.connect();

    // Fetch existing messages
    fetch('https://renty-server.onrender.com/api/chat/group')
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error('Failed to fetch messages:', err));

    // Real-time message reception
    socket.on('receiveGroupMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receiveGroupMessage');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userData) return;

    const { userId, userName } = userData;

    const messageData = {
      userId,
      userName,
      message: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    socket.emit('sendGroupMessage', messageData);
    setNewMessage('');
  };

  if (!userData) return null; // Or loading spinner

  return (
    <div className="group-forum-container">
      <div className="chat-header">
        <h2>Renty Forum</h2>
      </div>

      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          msg && msg.message && msg.userName && (
            <div
              key={`${msg.userId}-${msg.timestamp}-${index}`}
              className={`message-container ${msg.userId === userData.userId ? 'own-message' : 'other-message'}`}
            >
              <div className="message-avatar">
                <img
                  src={`https://ui-avatars.com/api/?name=${msg.userName}&background=2e7dc0&color=fff`}
                  alt="avatar"
                />
              </div>
              <div className="message-content">
                <div className="message-info">
                  <span className="message-user">{msg.userName}</span>
                  <span className="message-timestamp">{msg.timestamp}</span>
                </div>
                <div className="message-text">{msg.message}</div>
              </div>
            </div>
          )
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
