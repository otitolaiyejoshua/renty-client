// agent/WelcomeMessage.js
import React from 'react';
import './WelcomeMessage.css'; // Optional: custom styles

const WelcomeMessage = () => {
  return (
    <div className="welcome-container">
      <h2>Welcome back, Agent!</h2>
      <p>
        Use the sidebar to manage your properties, track payments, respond to messages, or access your settings.
        Your dashboard is designed to give you full control and insights into your listings.
      </p>
    </div>
  );
};

export default WelcomeMessage;
