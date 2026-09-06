import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faComments, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const Forum = React.forwardRef((props, ref) => {
  const posts = ['Best neighbourhoods for students', 'How to find a compatible roommate', 'Dealing with difficult landlords — tips & advice'];

  return (
    <section ref={ref} className="forum" id="forum">
      <div className="section-container forum-inner">
        <div className="forum-copy">
          <div className="forum-icon"><FontAwesomeIcon icon={faComments} /></div>
          <span className="section-eyebrow">The Renty community</span>
          <h2>Don't navigate student housing alone.</h2>
          <p>Ask questions, share experiences and learn from other students who have already been through the process.</p>
          <Link to="/user-dashboard/forum" className="forum-button">Join the community <FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>

        <div className="discussion-card">
          <div className="discussion-head"><div><span>Community</span><h3>Recent discussions</h3></div><FontAwesomeIcon icon={faComments} /></div>
          <div className="discussion-list">
            {posts.map((post, index) => (
              <div className="discussion-item" key={post}><span>{String(index + 1).padStart(2, '0')}</span><p>{post}</p><FontAwesomeIcon icon={faCircleCheck} /></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Forum;
