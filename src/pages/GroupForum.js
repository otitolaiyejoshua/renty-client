import React, { useEffect, useMemo, useRef, useState } from 'react';
import './GroupForum.css';
import socket from '../socket';
import { getUserData } from '../getUserData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faUsers, faCircle, faRotate } from '@fortawesome/free-solid-svg-icons';

const API_URL = process.env.REACT_APP_API_URL || '';

const GroupForum = () => {
  const userData = getUserData();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [online, setOnline] = useState(false);
  const chatBoxRef = useRef(null);

  const displayName = userData?.userName || userData?.username || 'Renty member';
  const initials = useMemo(() => displayName.split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase(), [displayName]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/chat/group`);
      if (!res.ok) throw new Error('Failed to load forum');
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch forum messages:', err);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    loadMessages();
    socket.connect();
    setOnline(true);
    const receive = (message) => setMessages(prev => [...prev, message]);
    socket.on('receiveGroupMessage', receive);
    return () => { socket.off('receiveGroupMessage', receive); setOnline(false); };
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const text = newMessage.trim();
    if (!text || !userData || sending) return;
    const messageData = { userId: userData.userId, userName: displayName, message: text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setSending(true);
    socket.emit('sendGroupMessage', messageData);
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');
    setTimeout(() => setSending(false), 250);
  };

  return <section className="renty-forum-page">
    <div className="renty-forum-topbar">
      <div className="renty-forum-heading"><div className="renty-forum-mark"><FontAwesomeIcon icon={faUsers}/></div><div><p>Renty Community</p><h1>Community forum</h1><span>Ask questions, share rental tips and help other members.</span></div></div>
      <button className="renty-forum-refresh" onClick={loadMessages}><FontAwesomeIcon icon={faRotate}/> Refresh</button>
    </div>
    <div className="renty-forum-card">
      <div className="renty-forum-status"><span><FontAwesomeIcon icon={faCircle}/> {online ? 'Live community' : 'Connecting…'}</span><small>{messages.length} posts in this conversation</small></div>
      <div className="renty-forum-messages" ref={chatBoxRef}>
        {loading ? <div className="renty-forum-empty"><strong>Loading community…</strong><span>Getting the latest conversations.</span></div> : messages.length === 0 ? <div className="renty-forum-empty"><strong>Start the conversation</strong><span>Be the first to share something useful with the Renty community.</span></div> : messages.map((msg, index) => {
          if (!msg?.message || !msg?.userName) return null;
          const own = msg.userId === userData?.userId;
          return <div key={`${msg.userId}-${msg.timestamp}-${index}`} className={`renty-forum-message ${own ? 'own' : ''}`}><div className="renty-forum-avatar">{msg.userName.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase()}</div><div className="renty-forum-bubble"><div className="renty-forum-meta"><strong>{own ? 'You' : msg.userName}</strong><span>{msg.timestamp}</span></div><p>{msg.message}</p></div></div>;
        })}
      </div>
      <form className="renty-forum-composer" onSubmit={handleSend}><div className="renty-composer-avatar">{initials}</div><input value={newMessage} onChange={e=>setNewMessage(e.target.value)} placeholder="Share something with the Renty community…" maxLength={500}/><button disabled={!newMessage.trim() || sending}><FontAwesomeIcon icon={faPaperPlane}/> <span>Post</span></button></form>
    </div>
  </section>;
};
export default GroupForum;
