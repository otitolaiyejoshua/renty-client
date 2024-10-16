// frontend/src/pages/Forum.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Forum() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:5000/api/forum/posts');
        setPosts(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/forum/posts', { title, content }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTitle('');
            setContent('');
            fetchPosts();
        } catch (error) {
            console.error(error);
            alert('Failed to create post.');
        }
    };

    return (
        <div>
            <h2>Forum</h2>
            {(
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
                    <button type="submit">Create Post</button>
                </form>
            )}
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/forum/${post.id}`}>{post.title}</Link> by {post.username} on {new Date(post.created_at).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Forum;
