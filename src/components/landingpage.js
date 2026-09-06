import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function LandingPage({ openLoginPopup, openSignupPopup, handleScroll }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (section) => {
    handleScroll(section);
    setOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <button className="brand" onClick={() => go('main')} aria-label="Go to Renty home">
        <img src="/images/renty.png" alt="Renty" />
        <span>Renty</span>
      </button>

      <nav className={`nav-items ${open ? 'open' : ''}`} aria-label="Primary navigation">
        <button className="links active" onClick={() => go('main')}>Home</button>
        <button className="links" onClick={() => go('about-us')}>About</button>
        <button className="links" onClick={() => go('services')}>How it works</button>
        <button className="links" onClick={() => go('forum')}>Community</button>
        <div className="nav-actions">
          <button className="login-link" onClick={() => { openLoginPopup(); setOpen(false); }}>Log in</button>
          <button className="stylebtn" onClick={() => { openSignupPopup(); setOpen(false); }}>Get started</button>
        </div>
      </nav>

      <button
        className="nav-opener"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
      >
        <FontAwesomeIcon icon={open ? faTimes : faBars} />
      </button>
    </header>
  );
}

export default LandingPage;
