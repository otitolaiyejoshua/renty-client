import React from 'react';

const Forum = React.forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      className="forum"
      style={{
        background: '#f0f7fc',
        padding: '60px 20px',
        textAlign: 'center',
        color: '#333',
      }}
    >
      <img
        className="forum-logo"
        src="images/renty.png"
        alt="Renty Logo"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          marginBottom: '20px',
        }}
      />

      <h2 style={{ fontSize: '2.8rem', color: '#2e7dc0', marginBottom: '10px' }}>
        Join the Renty Community Forum
      </h2>

      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '25px', maxWidth: '700px', marginInline: 'auto' }}>
        Connect with fellow students, share your rental experiences, ask questions, and get advice from a vibrant student housing community.
      </p>

      <button
        className="btn visit-forum-btn"
        style={{
          backgroundColor: '#2e7dc0',
          color: '#fff',
          padding: '14px 28px',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '40px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        Visit the Forum
      </button>

      <div className="recent-posts" style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{ color: '#2e7dc0', fontSize: '1.6rem', marginBottom: '15px' }}>Recent Discussions</h3>
        <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '1.1rem', color: '#444' }}>
          <li>Best Neighborhoods for Students</li>
          <li>How to Find a Compatible Roommate</li>
          <li>Dealing with Difficult Landlords – Tips & Advice</li>
        </ul>
      </div>
    </section>
  );
});

export default Forum;
