// frontend/src/pages/ForumPost.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function ForumPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [replies, setReplies] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        const res = await axios.get(`http://localhost:5000/api/forum/posts/${id}`);
        setPost(res.data.post);
        setReplies(res.data.replies);
    };

    const handleReply = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/forum/posts/${id}/replies`, { content }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setContent('');
            fetchPost();
        } catch (error) {
            console.error(error);
            alert('Failed to post reply.');
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>By {post.username} on {new Date(post.created_at).toLocaleString()}</p>

            <hr />

            <h3>Replies</h3>
            <ul>
                {replies.map(reply => (
                    <li key={reply.id}>
                        {reply.content} - {reply.username} on {new Date(reply.created_at).toLocaleString()}
                    </li>
                ))}
            </ul>

            {(
                <form onSubmit={handleReply}>
                    <textarea placeholder="Your reply" value={content} onChange={(e) => setContent(e.target.value)} required />
                    <button type="submit">Post Reply</button>
                </form>
            )}
        </div>
    );
}

export default ForumPost;
