import React from 'react';
const Forum = React.forwardRef((props, ref)=> {
  return (
    <section ref={ref} className="forum">
        <img className="forum-logo" src="images/forum.png"/>
      <h2>Join the Uniconnect Community Forum</h2>
      <p>Share experiences, ask questions, and connect with other students.</p>
      <button className="btn visit-forum-btn">Visit the Forum</button>
      <div className="recent-posts">
        <h3>Recent Posts:</h3>
        <ul>
          <li>"Best Neighborhoods for Students"</li>
          <li>"How to Find a Roommate"</li>
          <li>"Dealing with Landlords"</li>
        </ul>
      </div>
    </section>
  );
});

export default Forum;
