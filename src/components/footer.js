import React from 'react';
const Footer = () => {
  return (
    <footer className="footer">
      <p>Privacy Policy | Terms of Service | Contact</p>
      <div className="social-media-icons">
        <a href=" https://www.facebook.com/profile.php?id=61562699027963"><img className="social-media" src="/images/fb.png"/></a>
        <a href=" https://www.tiktok.com/@officialuniconnectpage?_t=8oJwzq5oA9m&_r=1"><img className="social-media" src="/images/tiktok.png"/></a>
        <a href="https://www.instagram.com/invites/contact/?i=obfae4qeju8b&utm_content=vc38dgs"><img className="social-media" src="/images/instagram.jpg"/></a>
        <img className="social-media" src="/images/x.png"/>
      </div>
    </footer>
  );
};

export default Footer;
