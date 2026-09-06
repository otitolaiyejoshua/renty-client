import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const top = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="footer">
      <div className="section-container footer-top">
        <div className="footer-brand">
          <button className="footer-logo" onClick={top}><img src="/images/renty.png" alt="Renty" /></button>
          <h3>Renty</h3>
          <p>Making student housing easier to discover, compare and navigate.</p>
        </div>
        <div className="footer-cta"><span>Ready to find your next place?</span><a href="mailto:otitolaiyejoshua42@gmail.com"><FontAwesomeIcon icon={faEnvelope} /> Contact Renty</a></div>
      </div>
      <div className="section-container footer-bottom">
        <span>© {new Date().getFullYear()} Renty. All rights reserved.</span>
        <div><a href="mailto:otitolaiyejoshua42@gmail.com">Contact</a><button onClick={top}>Back to top <FontAwesomeIcon icon={faArrowUp} /></button></div>
      </div>
    </footer>
  );
};

export default Footer;
