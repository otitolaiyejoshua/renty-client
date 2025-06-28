import React from 'react';

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: '#2e7dc0',
        color: '#fff',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <p style={{ marginBottom: '15px', fontSize: '1rem', fontWeight: '500' }}>
        <a href="#" style={{ color: '#fff', textDecoration: 'underline', marginRight: '10px' }}>Privacy Policy</a>|
        <a href="#" style={{ color: '#fff', textDecoration: 'underline', margin: '0 10px' }}>Terms of Service</a>|
        <a href="mailto:otitolaiyejoshua42@gmail.com" style={{ color: '#fff', textDecoration: 'underline', marginLeft: '10px' }}>Contact</a>
      </p>

      <div
        className="social-media-icons"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '25px',
          marginTop: '20px',
        }}
      >
        <a href="https://www.facebook.com/joshuaotitolaiye" target="_blank" rel="noopener noreferrer">
          <img
            className="social-media"
            src="/images/fb.png"
            alt="Facebook"
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            className="social-media"
            src="/images/tiktok.png"
            alt="TikTok"
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            className="social-media"
            src="/images/instagram.jpg"
            alt="Instagram"
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            className="social-media"
            src="/images/x.png"
            alt="X (Twitter)"
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          />
        </a>
      </div>

      <p style={{ marginTop: '30px', fontSize: '0.9rem', opacity: 0.9 }}>
        &copy; {new Date().getFullYear()} Renty. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
